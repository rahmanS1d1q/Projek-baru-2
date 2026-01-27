import React, { useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { PredictRequest } from "../api/client";

interface PredictFormProps {
  onSubmit: (data: PredictRequest, model: "gru" | "svm") => void;
  loading: boolean;
}

const PredictForm: React.FC<PredictFormProps> = ({ onSubmit, loading }) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedModel, setSelectedModel] = useState<"gru" | "svm">("gru");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && description.trim()) {
      onSubmit(
        { title: title.trim(), description: description.trim() },
        selectedModel,
      );
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="predict-form">
      <h2>{t("form.title")}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">{t("form.jobTitle")}:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Software Engineer, Marketing Manager"
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">{t("form.jobDescription")}:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter job description here..."
            rows={6}
            required
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>{t("form.algorithm")}:</label>
          <div className="radio-group">
            <label className="radio-label">
              <input
                type="radio"
                value="gru"
                checked={selectedModel === "gru"}
                onChange={(e) =>
                  setSelectedModel(e.target.value as "gru" | "svm")
                }
                disabled={loading}
              />
              <span>{t("form.gru")}</span>
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="svm"
                checked={selectedModel === "svm"}
                onChange={(e) =>
                  setSelectedModel(e.target.value as "gru" | "svm")
                }
                disabled={loading}
              />
              <span>{t("form.svm")}</span>
            </label>
          </div>
        </div>

        <div className="button-group">
          <button
            type="submit"
            disabled={loading || !title.trim() || !description.trim()}
          >
            {loading ? "..." : t("form.classify")}
          </button>
          <button type="button" onClick={handleClear} disabled={loading}>
            {t("form.clear")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PredictForm;
