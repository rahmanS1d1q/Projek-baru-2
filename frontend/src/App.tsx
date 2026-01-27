import { useState, useEffect } from "react";
import PredictForm from "./components/PredictForm";
import ResultCard from "./components/ResultCard";
import LandingPage from "./components/LandingPage";
import LanguageToggle from "./components/LanguageToggle";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import { apiClient, PredictRequest, PredictResponse } from "./api/client";
import "./App.css";

function AppContent() {
  const { t } = useLanguage();
  const [showLanding, setShowLanding] = useState(true);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  );

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    try {
      await apiClient.healthCheck();
      setApiStatus("online");
    } catch (err) {
      setApiStatus("offline");
      console.error("API health check failed:", err);
    }
  };

  const handlePredict = async (data: PredictRequest, model: "gru" | "svm") => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiClient.predict(data, model);
      setResult(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleBackToHome = () => {
    setShowLanding(true);
    setResult(null);
    setError(null);
  };

  if (showLanding) {
    return (
      <div className="app">
        <header className="app-header">
          <div className="header-brand">
            <div className="brand-text">
              <span className="brand-name">{t("header.brand")}</span>
              <span className="brand-tagline">{t("header.tagline")}</span>
            </div>
          </div>
          <div className="header-actions">
            <LanguageToggle />
            <div className={`api-status ${apiStatus}`}>
              <span className="status-indicator"></span>
              {t("header.apiStatus")}:{" "}
              {apiStatus === "checking"
                ? t("header.checking")
                : apiStatus === "online"
                  ? t("header.online")
                  : t("header.offline")}
              {apiStatus === "offline" && (
                <button onClick={checkApiHealth} className="retry-btn">
                  {t("header.retry")}
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="app-main">
          <LandingPage onGetStarted={handleGetStarted} />
        </main>

        <footer className="app-footer">
          <p>{t("footer.text")}</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <button onClick={handleBackToHome} className="back-btn">
            {t("header.backToHome")}
          </button>
          <div className="header-brand">
            <div className="brand-text">
              <span className="brand-name">{t("header.brand")}</span>
              <span className="brand-tagline">{t("header.tagline")}</span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <LanguageToggle />
          <div className={`api-status ${apiStatus}`}>
            <span className="status-indicator"></span>
            {t("header.apiStatus")}:{" "}
            {apiStatus === "checking"
              ? t("header.checking")
              : apiStatus === "online"
                ? t("header.online")
                : t("header.offline")}
            {apiStatus === "offline" && (
              <button onClick={checkApiHealth} className="retry-btn">
                {t("header.retry")}
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          <div className="form-section">
            <PredictForm onSubmit={handlePredict} loading={loading} />
          </div>

          <div className="result-section">
            <ResultCard result={result} error={error} />
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>{t("footer.text")}</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
