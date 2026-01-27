import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./LanguageToggle.css";

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle">
      <button
        className={`lang-btn ${language === "en" ? "active" : ""}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === "id" ? "active" : ""}`}
        onClick={() => setLanguage("id")}
      >
        ID
      </button>
    </div>
  );
};

export default LanguageToggle;
