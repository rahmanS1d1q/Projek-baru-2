import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  id: {
    // Header
    "header.brand": "JobClassifier",
    "header.tagline": "AI-Powered",
    "header.backToHome": "← Kembali ke Beranda",
    "header.apiStatus": "Status API",
    "header.online": "Online",
    "header.offline": "Offline",
    "header.checking": "Memeriksa...",
    "header.retry": "Coba Lagi",

    // Hero Section
    "hero.badge": "KLASIFIKASI AI BERTENAGA",
    "hero.title1": "KLASIFIKASI",
    "hero.title2": "DESKRIPSI PEKERJAAN ANDA",
    "hero.subtitle":
      "Jangan buang waktu mengklasifikasi deskripsi pekerjaan secara manual. Temukan kategori pekerjaan Anda dengan algoritma AI canggih kami dan dapatkan hasil akurat dalam hitungan detik.",
    "hero.cta": "Mulai Klasifikasi",
    "hero.stats1": "Dipercaya oleh 10K+ pengguna",
    "hero.stats2": "Tingkat akurasi 95%",

    // Demo Cards
    "demo.input.header": "Deskripsi Pekerjaan",
    "demo.input.content":
      '"Mencari developer React dengan pengalaman 3+ tahun..."',
    "demo.output.header": "Hasil Klasifikasi",
    "demo.output.category": "Pengembangan Perangkat Lunak",
    "demo.output.confidence": "97.3%",

    // Categories Section
    "categories.title1": "TEMUKAN",
    "categories.title2": "POPULER",
    "categories.title3": "KATEGORI",
    "categories.software.title": "Pengembangan Perangkat Lunak",
    "categories.software.desc": "Pemrograman & Teknologi",
    "categories.marketing.title": "Pemasaran & Penjualan",
    "categories.marketing.desc": "Pemasaran Digital",
    "categories.design.title": "Desain & Kreatif",
    "categories.design.desc": "Desain UI/UX",
    "categories.classify": "Klasifikasi",

    // Features Section
    "features.badge": "FITUR KAMI DENGAN KLASIFIKASI AI",
    "features.title1": "CERITA",
    "features.title2": "KAMI",
    "features.title3": "DENGAN AI CANGGIH",
    "features.desc1":
      "Kami berpengalaman dalam menghadirkan petualangan untuk membantu perjalanan mereka mendapatkan tujuan yang lebih baik di dunia dan mewujudkannya",
    "features.desc2":
      "Kami tidak hanya membantu memulai petualangan Anda, tepat di sini. Sebaliknya kami menemani selama perjalanan sampai selesai",
    "features.stat1.number": "12K+",
    "features.stat1.label": "Pekerjaan Berhasil Diklasifikasi",
    "features.stat2.number": "16+",
    "features.stat2.label": "Kategori Pekerjaan Berbeda",
    "features.stat3.number": "20+",
    "features.stat3.label": "Tahun Pengalaman AI",

    // CTA Section
    "cta.title1": "MULAI",
    "cta.title2": "KLASIFIKASI",
    "cta.title3": "BARU ANDA DI SELURUH DUNIA",
    "cta.desc":
      "Kami menyediakan banyak pilihan kategori klasifikasi pekerjaan di seluruh dunia, Anda harus mencoba layanan klasifikasi kami",
    "cta.button": "Mulai Sekarang",

    // Form
    "form.title": "Klasifikasi Pekerjaan",
    "form.jobTitle": "Judul Pekerjaan",
    "form.jobDescription": "Deskripsi Pekerjaan",
    "form.algorithm": "Pilih Algoritma",
    "form.gru": "GRU Neural Network",
    "form.svm": "Support Vector Machine",
    "form.classify": "Klasifikasi",
    "form.clear": "Bersihkan",

    // Results
    "result.title": "Hasil Klasifikasi",
    "result.category": "Kategori Prediksi",
    "result.confidence": "Skor Kepercayaan",
    "result.processed": "Teks yang Diproses",
    "result.error": "Terjadi Kesalahan",

    // Footer
    "footer.text":
      "Dibuat dengan React + TypeScript + Vite | Backend: FastAPI + Model ML",
  },
  en: {
    // Header
    "header.brand": "JobClassifier",
    "header.tagline": "AI-Powered",
    "header.backToHome": "← Back to Home",
    "header.apiStatus": "API Status",
    "header.online": "Online",
    "header.offline": "Offline",
    "header.checking": "Checking...",
    "header.retry": "Retry",

    // Hero Section
    "hero.badge": "AI-POWERED CLASSIFICATION",
    "hero.title1": "CLASSIFY YOUR",
    "hero.title2": "JOB DESCRIPTIONS",
    "hero.subtitle":
      "Don't waste time classifying job descriptions manually. Discover your job category with our advanced AI algorithms and get accurate results in seconds.",
    "hero.cta": "Start Classifying",
    "hero.stats1": "Trusted by 10K+ users",
    "hero.stats2": "95% accuracy rate",

    // Demo Cards
    "demo.input.header": "Job Description",
    "demo.input.content":
      '"Looking for a React developer with 3+ years experience..."',
    "demo.output.header": "Classification Result",
    "demo.output.category": "Software Development",
    "demo.output.confidence": "97.3%",

    // Categories Section
    "categories.title1": "FIND",
    "categories.title2": "POPULAR",
    "categories.title3": "CATEGORIES",
    "categories.software.title": "Software Development",
    "categories.software.desc": "Programming & Tech",
    "categories.marketing.title": "Marketing & Sales",
    "categories.marketing.desc": "Digital Marketing",
    "categories.design.title": "Design & Creative",
    "categories.design.desc": "UI/UX Design",
    "categories.classify": "Classify",

    // Features Section
    "features.badge": "OUR FEATURES WITH AI CLASSIFICATION",
    "features.title1": "OUR",
    "features.title2": "STORIES",
    "features.title3": "WITH ADVANCED AI",
    "features.desc1":
      "We are experienced in bringing adventures to help their journey get better destinations in the world and make it happen",
    "features.desc2":
      "We don't just help to start your adventures, right here. Instead we accompany during the trip until it's finished",
    "features.stat1.number": "12K+",
    "features.stat1.label": "Jobs Successfully Classified",
    "features.stat2.number": "16+",
    "features.stat2.label": "Different Job Categories",
    "features.stat3.number": "20+",
    "features.stat3.label": "Years of AI Experience",

    // CTA Section
    "cta.title1": "START YOUR NEW",
    "cta.title2": "CLASSIFICATION",
    "cta.title3": "AROUND THE WORLD",
    "cta.desc":
      "We provide many choices of job classification categories around the world, you should try our classification service",
    "cta.button": "Get Started Now",

    // Form
    "form.title": "Job Classification",
    "form.jobTitle": "Job Title",
    "form.jobDescription": "Job Description",
    "form.algorithm": "Select Algorithm",
    "form.gru": "GRU Neural Network",
    "form.svm": "Support Vector Machine",
    "form.classify": "Classify",
    "form.clear": "Clear",

    // Results
    "result.title": "Classification Results",
    "result.category": "Predicted Category",
    "result.confidence": "Confidence Scores",
    "result.processed": "Processed Text",
    "result.error": "An Error Occurred",

    // Footer
    "footer.text":
      "Built with React + TypeScript + Vite | Backend: FastAPI + ML Models",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return saved === "id" || saved === "en" ? saved : "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
