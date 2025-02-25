from fastapi import APIRouter, HTTPException, Query, Depends, status
from typing import List, Optional
from uuid import UUID
from app.schemas.idea import IdeaCreate, IdeaUpdate, IdeaResponse
from app.services.idea_service import IdeaService

router = APIRouter()
service = IdeaService()

@router.get("/", response_model=List[IdeaResponse])
def get_ideas(
    limit: int = Query(100, ge=1, le=100),
    offset: int = Query(0, ge=0),
    category: Optional[str] = None,
    sub_category: Optional[str] = None,
    status: Optional[str] = None,
    humanity_challenge: Optional[str] = None,
    title: Optional[str] = None,
    problem_statement: Optional[str] = None
):
    """
    Get all ideas with optional filtering
    """
    if any([category, sub_category, status, humanity_challenge, title, problem_statement]):
        query_params = {
            "category": category,
            "sub_category": sub_category,
            "status": status,
            "humanity_challenge": humanity_challenge,
            "title": title,
            "problem_statement": problem_statement
        }
        # Remove None values
        query_params = {k: v for k, v in query_params.items() if v is not None}
        return service.search_ideas(query_params)
    return service.get_all_ideas(limit, offset)

@router.get("/{idea_id}", response_model=IdeaResponse)
def get_idea(idea_id: UUID):
    """
    Get an idea by its ID
    """
    idea = service.get_idea_by_id(idea_id)
    if not idea:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Idea not found")
    
    # Increment view count
    service.view_idea(idea_id)
    
    return idea

@router.post("/", response_model=IdeaResponse, status_code=status.HTTP_201_CREATED)
def create_idea(idea: IdeaCreate):
    """
    Create a new idea
    """
    return service.create_idea(idea)

@router.put("/{idea_id}", response_model=IdeaResponse)
def update_idea(idea_id: UUID, idea: IdeaUpdate):
    """
    Update an existing idea
    """
    # Check if idea exists
    existing_idea = service.get_idea_by_id(idea_id)
    if not existing_idea:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Idea not found")
    
    updated_idea = service.update_idea(idea_id, idea)
    return updated_idea

@router.delete("/{idea_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_idea(idea_id: UUID):
    """
    Delete an idea
    """
    # Check if idea exists
    existing_idea = service.get_idea_by_id(idea_id)
    if not existing_idea:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Idea not found")
    
    success = service.delete_idea(idea_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete idea")

@router.post("/{idea_id}/upvote", status_code=status.HTTP_204_NO_CONTENT)
def upvote_idea(idea_id: UUID):
    """
    Upvote an idea
    """
    # Check if idea exists
    idea = service.get_idea_by_id(idea_id)
    if not idea:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Idea not found")
    
    service.upvote_idea(idea_id)

@router.post("/{idea_id}/downvote", status_code=status.HTTP_204_NO_CONTENT)
def downvote_idea(idea_id: UUID):
    """
    Downvote an idea
    """
    # Check if idea exists
    idea = service.get_idea_by_id(idea_id)
    if not idea:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Idea not found")
    
    service.downvote_idea(idea_id) 