# Custom stopwords untuk preprocessing
# Tambahkan stopwords khusus sesuai dengan domain job classification

CUSTOM_STOPWORDS = [
    # Kata-kata umum yang sering muncul di job posting tapi tidak informatif
    "job", "work", "position", "role", "opportunity", "career", "employment",
    "company", "team", "office", "location", "salary", "benefit", "experience",
    "skill", "requirement", "qualification", "responsibility", "duty", "task",
    "apply", "application", "candidate", "applicant", "resume", "cv",
    "full", "time", "part", "contract", "permanent", "temporary", "freelance",
    "remote", "onsite", "hybrid", "flexible", "schedule", "shift",
    "year", "years", "month", "months", "week", "weeks", "day", "days",
    "minimum", "maximum", "preferred", "required", "must", "should", "able",
    "good", "excellent", "strong", "solid", "proven", "demonstrated",
    "looking", "seeking", "hiring", "recruiting", "join", "become", "grow",
    "develop", "build", "create", "manage", "lead", "support", "help",
    "working", "collaborate", "coordinate", "communicate", "report",
    "jakarta", "surabaya", "bandung", "medan", "semarang", "makassar",
    "indonesia", "indonesian", "local", "national", "international",
    "fresh", "graduate", "senior", "junior", "entry", "level", "mid",
    "bachelor", "master", "degree", "diploma", "certification", "license",
    "male", "female", "age", "old", "young", "married", "single",
    "please", "contact", "email", "phone", "call", "send", "submit",
    "immediately", "asap", "urgent", "soon", "available", "start",
    "competitive", "attractive", "negotiable", "based", "performance",
    "plus", "bonus", "allowance", "insurance", "medical", "health",
    "training", "development", "growth", "advancement", "promotion",
    "environment", "culture", "dynamic", "fast", "paced", "challenging",
    "innovative", "creative", "professional", "friendly", "supportive"
]