import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { PredictResponse } from "../api/client";

interface ResultCardProps {
  result: PredictResponse | null;
  error: string | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, error }) => {
  const { t } = useLanguage();

  if (error) {
    return (
      <div className="result-card error">
        <h3>❌ {t("result.error")}</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  if (!result.ok) {
    return (
      <div className="result-card error">
        <h3>❌ {t("result.error")}</h3>
        <p>{result.error || "Unknown error occurred"}</p>
      </div>
    );
  }

  const formatPercentage = (value: number) => {
    return (value * 100).toFixed(2) + "%";
  };

  return (
    <div className="result-card success">
      <h3> {t("result.title")}</h3>

      <div className="result-main">
        <div className="predicted-category">
          <h4>{t("result.category")}:</h4>
          <span className="category-label">{result.label}</span>
        </div>

        <div className="model-info">
          <span className="model-badge">
            Model: {result.model_used.toUpperCase()}
          </span>
        </div>
      </div>

      {result.top3 && result.top3.length > 0 && (
        <div className="confidence-scores">
          <h4>{t("result.confidence")}:</h4>
          <div className="scores-list">
            {result.top3.map(([category, confidence], index) => (
              <div
                key={category}
                className={`score-item ${index === 0 ? "top-score" : ""}`}
              >
                <span className="category">{category}</span>
                <div className="confidence-bar">
                  <div
                    className="confidence-fill"
                    style={{ width: `${confidence * 100}%` }}
                  ></div>
                  <span className="confidence-text">
                    {formatPercentage(confidence)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result.processed_text && (
        <div className="processed-text">
          <h4>{t("result.processed")}:</h4>
          <p className="processed-content">{result.processed_text}</p>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
