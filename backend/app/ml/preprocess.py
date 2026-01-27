# backend/app/ml/preprocess.py

import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory

from .stopwords_custom import CUSTOM_STOPWORDS

# Pastikan resource NLTK ada (dev-friendly)
try:
    nltk.data.find("tokenizers/punkt")
except LookupError:
    nltk.download("punkt")

try:
    nltk.data.find("corpora/stopwords")
except LookupError:
    nltk.download("stopwords")

stemmer = StemmerFactory().create_stemmer()

stopwords_ind = set(stopwords.words("indonesian"))
stopwords_en = set(stopwords.words("english"))

custom_stopwords = set(CUSTOM_STOPWORDS)
combined_stopwords = stopwords_ind.union(stopwords_en).union(custom_stopwords)

# --- Fungsi Preprocessing (nama & alur tetap sama) ---
def cleaning_text_bilingual(text):
    text = str(text)
    text = re.sub(r"http\S+|www\S+|https\S+", "", text)
    text = re.sub(r"<[^>]+>", "", text)
    text = re.sub(r"@\w+|#\w+", "", text)
    text = re.sub(r"[^\w\s]", "", text)
    return re.sub(r"\s+", " ", text).strip()

def case_folding(text):
    return text.lower()

def tokenize_text_universal(text):
    return word_tokenize(text)

def remove_stopwords_combined(tokens):
    return [w for w in tokens if w not in combined_stopwords and len(w) > 1]

def stem_indonesian_and_remove_numbers(tokens):
    return [stemmer.stem(w) for w in tokens if not w.isdigit()]

def preprocess_for_prediction(text: str) -> str:
    cleaned = cleaning_text_bilingual(text)
    folded = case_folding(cleaned)
    tokens = tokenize_text_universal(folded)
    tokens = remove_stopwords_combined(tokens)
    tokens = stem_indonesian_and_remove_numbers(tokens)
    return " ".join(tokens)