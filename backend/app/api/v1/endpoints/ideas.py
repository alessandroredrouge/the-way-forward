from fastapi import APIRouter, HTTPException, status
from typing import List
from app.schemas.idea import IdeaCreate, IdeaResponse

router = APIRouter()

# Temporary storage for development
ideas_db = []

@router.get("/", response_model=List[IdeaResponse])
async def get_ideas():
    """Get all ideas"""
    return ideas_db

@router.post("/", response_model=IdeaResponse, status_code=status.HTTP_201_CREATED)
async def create_idea(idea: IdeaCreate):
    """Create a new idea"""
    new_idea = idea.dict()
    new_idea["id"] = len(ideas_db) + 1  # Simple ID generation
    ideas_db.append(new_idea)
    return new_idea 