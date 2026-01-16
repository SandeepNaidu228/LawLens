from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from ml_logic import analyze_incident
import json
import os

app = FastAPI(
    title="LawLens API",
    description="Public-safe legal awareness API (IPC section guidance)",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Configuration
JSON_FILE_PATH = 'ipc_sections.json'

def get_ipc_sections():
    """Reads the IPC sections from the local JSON file."""
    try:
        if not os.path.exists(JSON_FILE_PATH):
            return []
        
        with open(JSON_FILE_PATH, 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data
    except Exception as e:
        print(f"Error reading JSON database: {e}")
        return []

@app.get("/sections")
async def get_all_sections():
    sections = get_ipc_sections()
    if not sections:
        raise HTTPException(status_code=404, detail="No sections found")
    return sections

# ---------------------------
# Request schema
# ---------------------------
class IncidentRequest(BaseModel):
    description: str

# ---------------------------
# Health check
# ---------------------------
@app.get("/")
def health_check():
    return {
        "status": "ok",
        "message": "LawLens API is running"
    }

# ---------------------------
# Core analysis endpoint
# ---------------------------
@app.post("/analyze")
def analyze(request: IncidentRequest):
    """
    Analyze a user-described incident and return
    IPC sections as legal awareness guidance.
    """
    result = analyze_incident(request.description)
    return result
