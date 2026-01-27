import os
import pickle
import numpy as np
from joblib import load as joblib_load
from tensorflow.keras.models import load_model as keras_load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences

from .preprocess import preprocess_for_prediction

class Predictor:
    def __init__(self, model_dir: str):
        self.model_dir = model_dir

        # --- load label encoder (dipakai semua) ---
        self.le = joblib_load(os.path.join(model_dir, "label_encoder.joblib"))

        # --- load SVM stack ---
        self.svm_model = joblib_load(os.path.join(model_dir, "linear_svm_model.joblib"))
        self.tfidf = joblib_load(os.path.join(model_dir, "tfidf_vectorizer.joblib"))

        # --- load GRU stack ---
        with open(os.path.join(model_dir, "tokenizer_nn.pkl"), "rb") as f:
            self.nn_tokenizer = pickle.load(f)
        self.gru_model = keras_load_model(os.path.join(model_dir, "gru_model.keras"), compile=False)

        # harus sama dengan training
        self.max_seq_len = 200

    def _topk(self, prob_dict, k=3):
        items = sorted(prob_dict.items(), key=lambda x: x[1], reverse=True)
        return items[:k]

    def predict(self, title: str, description: str, which: str = "gru"):
        raw = (str(title) + " " + str(description)).strip()
        processed = preprocess_for_prediction(raw)

        if not processed.strip():
            return {
                "ok": False,
                "error": "Teks kosong setelah preprocessing.",
                "processed_text": processed
            }

        which = (which or "gru").lower().strip()

        if which == "svm":
            X = self.tfidf.transform([processed])
            pred_id = int(self.svm_model.predict(X)[0])
            label = self.le.inverse_transform([pred_id])[0]

            # LinearSVC ga punya predict_proba. Kita bikin pseudo-prob dari decision_function.
            prob_dict = {}
            if hasattr(self.svm_model, "decision_function"):
                scores = self.svm_model.decision_function(X)[0]
                scores = np.array(scores, dtype=float)
                exp = np.exp(scores - np.max(scores))
                probs = exp / np.sum(exp)
                for i, cls in enumerate(self.le.classes_):
                    prob_dict[str(cls)] = float(probs[i])

            return {
                "ok": True,
                "model_used": "svm",
                "label": str(label),
                "top3": self._topk(prob_dict, 3) if prob_dict else [],
                "processed_text": processed
            }

        # default: GRU
        seq = self.nn_tokenizer.texts_to_sequences([processed])
        pad = pad_sequences(seq, maxlen=self.max_seq_len, padding="post", truncating="post")
        probs = self.gru_model.predict(pad, verbose=0)[0]
        pred_id = int(np.argmax(probs))
        label = self.le.inverse_transform([pred_id])[0]

        prob_dict = {str(self.le.classes_[i]): float(probs[i]) for i in range(len(self.le.classes_))}

        return {
            "ok": True,
            "model_used": "gru",
            "label": str(label),
            "top3": self._topk(prob_dict, 3),
            "processed_text": processed
        }
