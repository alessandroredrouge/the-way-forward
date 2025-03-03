from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from app.services.llm_service import LLMService
from typing import Optional

router = APIRouter()

class TextImprovementRequest(BaseModel):
    text: str

class TextImprovementResponse(BaseModel):
    improved_text: str

@router.post("/improve-text", response_model=TextImprovementResponse)
async def improve_text(request: TextImprovementRequest):
    """
    Improve the clarity and structure of an idea description.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    llm_service = LLMService()
    
    try:
        improved_text = await llm_service.improve_idea_text(request.text)
        return TextImprovementResponse(improved_text=improved_text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
