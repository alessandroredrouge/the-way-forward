from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID

class IdeaBase(BaseModel):
    title: str
    humanity_challenge: str
    category: str
    sub_category: str
    geographic_focus: str
    time_horizon: str
    problem_statement: str
    solution: str
    why_now: str
    market_estimate: int
    business_model: str
    technologies: List[str]
    competition: str
    status: str
    type_of_author: str
    author: str
    sources: List[str]
    
    # Optional fields
    ideal_customer_profile: Optional[str] = None
    skills_required: Optional[List[str]] = None
    potential_investors: Optional[List[str]] = None
    potential_customers: Optional[List[str]] = None
    contacts: Optional[List[str]] = None
    collaboration_groups: Optional[List[str]] = None
    similar_ideas: Optional[List[str]] = None
    supporting_material: Optional[Dict[str, Any]] = None
    other: Optional[str] = None

class IdeaCreate(IdeaBase):
    pass

class IdeaUpdate(BaseModel):
    title: Optional[str] = None
    humanity_challenge: Optional[str] = None
    category: Optional[str] = None
    sub_category: Optional[str] = None
    geographic_focus: Optional[str] = None
    time_horizon: Optional[str] = None
    problem_statement: Optional[str] = None
    solution: Optional[str] = None
    why_now: Optional[str] = None
    market_estimate: Optional[int] = None
    business_model: Optional[str] = None
    technologies: Optional[List[str]] = None
    competition: Optional[str] = None
    status: Optional[str] = None
    sources: Optional[List[str]] = None
    ideal_customer_profile: Optional[str] = None
    skills_required: Optional[List[str]] = None
    potential_investors: Optional[List[str]] = None
    potential_customers: Optional[List[str]] = None
    contacts: Optional[List[str]] = None
    collaboration_groups: Optional[List[str]] = None
    similar_ideas: Optional[List[str]] = None
    supporting_material: Optional[Dict[str, Any]] = None
    other: Optional[str] = None

class IdeaResponse(IdeaBase):
    id: UUID
    date_created: datetime
    date_updated: datetime
    upvotes: int = 0
    downvotes: int = 0
    view_count: int = 0
    is_featured: bool = False
    is_published: bool = True

    class Config:
        from_attributes = True 