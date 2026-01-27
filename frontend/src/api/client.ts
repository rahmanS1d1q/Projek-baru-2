// API client untuk komunikasi dengan FastAPI backend

const API_BASE_URL = "http://localhost:8000";

export interface PredictRequest {
  title: string;
  description: string;
}

export interface PredictResponse {
  ok: boolean;
  model_used: string;
  label: string;
  top3: Array<[string, number]>;
  processed_text: string;
  error?: string;
}

export interface HealthResponse {
  ok: boolean;
  message: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }
    return response.json();
  }

  async predict(
    data: PredictRequest,
    model: "gru" | "svm" = "gru",
  ): Promise<PredictResponse> {
    const url = new URL(`${this.baseUrl}/predict`);
    url.searchParams.append("model", model);

    const response = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Prediction failed: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();
