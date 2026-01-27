from fastapi import APIRouter, Query
from pydantic import BaseModel

from ..ml.predictor import Predictor
import os

router = APIRouter()

MODEL_DIR = os.path.join(os.path.dirname(__file__), "..", "models")
MODEL_DIR = os.path.abspath(MODEL_DIR)

predictor = Predictor(MODEL_DIR)

class PredictRequest(BaseModel):
    title: str
    description: str

@router.get("/health")
def health():
    return {"ok": True, "message": "API is running"}

@router.post("/predict")
def predict(payload: PredictRequest, model: str = Query(default="gru", description="gru|svm")):
    return predictor.predict(payload.title, payload.description, which=model)