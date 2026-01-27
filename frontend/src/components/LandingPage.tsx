import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import "./LandingPageNew.css";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const { t } = useLanguage();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span>{t("hero.badge")}</span>
            </div>
            <h1 className="hero-title">
              {t("hero.title1")}
              <span className="highlight">{t("hero.title2")}</span>
            </h1>
            <p className="hero-subtitle">{t("hero.subtitle")}</p>
            <div className="hero-actions">
              <button className="btn-primary" onClick={onGetStarted}>
                {t("hero.cta")}
              </button>
              <div className="hero-stats">
                <span>{t("hero.stats1")}</span>
                <span>{t("hero.stats2")}</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-visual">
              <div className="hero-person">
                <img
                  src="/images/professional-person.svg"
                  alt="Professional Person"
                  className="person-image"
                />
              </div>
              <div className="classification-demo">
                <div className="demo-card active">
                  <div className="card-header">{t("demo.input.header")}</div>
                  <div className="card-content">{t("demo.input.content")}</div>
                </div>
                <div className="arrow-down"></div>
                <div className="demo-card result">
                  <div className="card-header">{t("demo.output.header")}</div>
                  <div className="card-content">
                    <span className="category">
                      {t("demo.output.category")}
                    </span>
                    <span className="confidence">
                      {t("demo.output.confidence")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>
            {t("categories.title1")}{" "}
            <span className="highlight">{t("categories.title2")}</span>{" "}
            {t("categories.title3")}
          </h2>
        </div>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-image">
              <img
                src="/images/software-developer.svg"
                alt="Software Development"
                className="category-photo"
              />
            </div>
            <div className="category-info">
              <h3>{t("categories.software.title")}</h3>
              <p>{t("categories.software.desc")}</p>
              <div className="category-stats">
                <span className="accuracy">98%</span>
                <button className="btn-classify" onClick={onGetStarted}>
                  {t("categories.classify")}
                </button>
              </div>
            </div>
          </div>

          <div className="category-card">
            <div className="category-image">
              <img
                src="/images/marketing-person.svg"
                alt="Marketing & Sales"
                className="category-photo"
              />
            </div>
            <div className="category-info">
              <h3>{t("categories.marketing.title")}</h3>
              <p>{t("categories.marketing.desc")}</p>
              <div className="category-stats">
                <span className="accuracy">94%</span>
                <button className="btn-classify" onClick={onGetStarted}>
                  {t("categories.classify")}
                </button>
              </div>
            </div>
          </div>

          <div className="category-card">
            <div className="category-image">
              <img
                src="/images/designer-person.svg"
                alt="Design & Creative"
                className="category-photo"
              />
            </div>
            <div className="category-info">
              <h3>{t("categories.design.title")}</h3>
              <p>{t("categories.design.desc")}</p>
              <div className="category-stats">
                <span className="accuracy">92%</span>
                <button className="btn-classify" onClick={onGetStarted}>
                  {t("categories.classify")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-content">
          <div className="features-image">
            <div className="feature-visual">
              <img
                src="/images/ai-technology.svg"
                alt="AI Technology"
                className="ai-image"
              />
            </div>
          </div>
          <div className="features-text">
            <div className="section-badge">
              <span>{t("features.badge")}</span>
            </div>
            <h2>
              {t("features.title1")}{" "}
              <span className="highlight">{t("features.title2")}</span>{" "}
              {t("features.title3")}
            </h2>
            <p>{t("features.desc1")}</p>
            <p>{t("features.desc2")}</p>
            <div className="feature-stats">
              <div className="stat-item">
                <div className="stat-number">{t("features.stat1.number")}</div>
                <div className="stat-label">{t("features.stat1.label")}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{t("features.stat2.number")}</div>
                <div className="stat-label">{t("features.stat2.label")}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{t("features.stat3.number")}</div>
                <div className="stat-label">{t("features.stat3.label")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>
            {t("cta.title1")}{" "}
            <span className="highlight">{t("cta.title2")}</span>
            <br />
            {t("cta.title3")}
          </h2>
          <p>{t("cta.desc")}</p>
          <button className="btn-primary" onClick={onGetStarted}>
            {t("cta.button")}
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
