from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel
from typing import Dict, Any

from app.services.agent_service import AgentService

router = APIRouter()
service = AgentService()


class IdeaDescriptionRequest(BaseModel):
    """Request model for idea description analysis."""
    description: str


class IdeaAnalysisResponse(BaseModel):
    """Response model for idea analysis."""
    form_data: Dict[str, Any]


@router.post("/analyze-idea", response_model=IdeaAnalysisResponse)
def analyze_idea(request: IdeaDescriptionRequest):
    """
    Analyze an idea description and extract form fields.
    
    This endpoint uses an AI agent to analyze the provided idea description
    and extract relevant information to populate the idea submission form.
    """
    try:
        # Validate the request
        if not request.description or not request.description.strip():
            # Return a minimal valid form data structure
            return IdeaAnalysisResponse(form_data={
                "title": "Please provide a description",
                "humanity_challenge": "",
                "category": "",
                "sub_category": "",
                "geographic_focus": "",
                "time_horizon": "",
                "problem_statement": "",
                "solution": "",
                "why_now": "",
                "market_estimate": 0,
                "business_model": "",
                "technologies": [],
                "competition": "",
                "status": "",
                "type_of_author": "",
                "author": "",
                "sources": []
            })
        
        # Use the agent service to analyze the description
        form_data = service.analyze_idea_description(request.description)
        
        # Ensure the form_data is a dictionary
        if not isinstance(form_data, dict):
            print(f"Warning: form_data is not a dictionary: {type(form_data)}")
            form_data = {
                "title": "Error: Invalid response format",
                "problem_statement": request.description[:100] + "..." if len(request.description) > 100 else request.description
            }
        
        # Return the form data
        return IdeaAnalysisResponse(form_data=form_data)
    except Exception as e:
        # Log the error
        print(f"Error in analyze_idea endpoint: {str(e)}")
        
        # Return a minimal valid form data structure instead of an error
        return IdeaAnalysisResponse(form_data={
            "title": "Error analyzing idea",
            "humanity_challenge": "",
            "category": "",
            "sub_category": "",
            "geographic_focus": "",
            "time_horizon": "",
            "problem_statement": request.description[:100] + "..." if len(request.description) > 100 else request.description,
            "solution": "",
            "why_now": "",
            "market_estimate": 0,
            "business_model": "",
            "technologies": [],
            "competition": "",
            "status": "",
            "type_of_author": "",
            "author": "",
            "sources": []
        })
