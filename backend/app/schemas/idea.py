from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class IdeaBase(BaseModel):
    title: str
    description: str
    category: str
    subcategory: Optional[str] = None
    problem_statement: str
    solution: Optional[str] = None
    market_estimate: Optional[str] = None
    time_horizon: str

class IdeaCreate(IdeaBase):
    pass

class IdeaResponse(IdeaBase):
    id: int
    created_at: datetime = datetime.now()
    votes: int = 0
    comments: int = 0
    interested_count: int = 0

    class Config:
        from_attributes = True 