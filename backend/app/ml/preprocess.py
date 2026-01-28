# backend/app/ml/preprocess.py

import re
import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory

from .stopwords_custom import CUSTOM_STOPWORDS

# Download NLTK resources dengan error handling yang lebih robust
def ensure_nltk_resources():
    """Ensure all required NLTK resources are available"""
    resources_to_download = [
        ("tokenizers/punkt", "punkt"),
        ("tokenizers/punkt_tab", "punkt_tab"),
        ("corpora/stopwords", "stopwords")
    ]
    
    for resource_path, resource_name in resources_to_download:
        try:
            nltk.data.find(resource_path)
        except LookupError:
            try:
                print(f"Downloading NLTK resource: {resource_name}")
                nltk.download(resource_name, quiet=True)
            except Exception as e:
                print(f"Warning: Could not download {resource_name}: {e}")

# Download resources at module import
ensure_nltk_resources()

stemmer = StemmerFactory().create_stemmer()

# Initialize stopwords with error handling
try:
    stopwords_ind = set(stopwords.words("indonesian"))
except LookupError:
    print("Warning: Indonesian stopwords not available, using empty set")
    stopwords_ind = set()

try:
    stopwords_en = set(stopwords.words("english"))
except LookupError:
    print("Warning: English stopwords not available, using empty set")
    stopwords_en = set()

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
    """Tokenize text with robust fallback"""
    try:
        # Try NLTK first
        return word_tokenize(text)
    except Exception as e:
        print(f"NLTK tokenizer failed: {e}, using regex fallback")
        # Robust regex-based tokenization as fallback
        import string
        
        # Convert to lowercase
        text = text.lower()
        
        # Replace punctuation with spaces
        translator = str.maketrans(string.punctuation, ' ' * len(string.punctuation))
        text = text.translate(translator)
        
        # Split by whitespace and filter empty strings
        tokens = [token.strip() for token in text.split() if token.strip()]
        
        return tokens

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