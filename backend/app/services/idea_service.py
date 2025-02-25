from app.repositories.idea_repository import IdeaRepository
from app.schemas.idea import IdeaCreate, IdeaUpdate, IdeaResponse
from uuid import UUID
from typing import List, Optional, Dict, Any

class IdeaService:
    def __init__(self):
        self.repository = IdeaRepository()
    
    def get_all_ideas(self, limit: int = 100, offset: int = 0) -> List[IdeaResponse]:
        """
        Get all ideas with pagination
        """
        result = self.repository.get_all(limit, offset)
        return [IdeaResponse.model_validate(idea) for idea in result.data]
    
    def get_idea_by_id(self, idea_id: UUID) -> Optional[IdeaResponse]:
        """
        Get an idea by its ID
        """
        result = self.repository.get_by_id(idea_id)
        if result.data:
            return IdeaResponse.model_validate(result.data)
        return None
    
    def create_idea(self, idea: IdeaCreate) -> IdeaResponse:
        """
        Create a new idea
        """
        idea_dict = idea.model_dump()
        result = self.repository.create(idea_dict)
        return IdeaResponse.model_validate(result.data[0])
    
    def update_idea(self, idea_id: UUID, idea: IdeaUpdate) -> Optional[IdeaResponse]:
        """
        Update an existing idea
        """
        # Only include non-None values in the update
        update_data = {k: v for k, v in idea.model_dump().items() if v is not None}
        
        if not update_data:
            # If no fields to update, just return the current idea
            return self.get_idea_by_id(idea_id)
        
        # Update the date_updated field
        update_data["date_updated"] = "NOW()"
        
        result = self.repository.update(idea_id, update_data)
        if result.data:
            return IdeaResponse.model_validate(result.data[0])
        return None
    
    def delete_idea(self, idea_id: UUID) -> bool:
        """
        Delete an idea
        """
        result = self.repository.delete(idea_id)
        return len(result.data) > 0
    
    def search_ideas(self, query_params: Dict[str, Any]) -> List[IdeaResponse]:
        """
        Search ideas based on query parameters
        """
        result = self.repository.search(query_params)
        return [IdeaResponse.model_validate(idea) for idea in result.data]
    
    def view_idea(self, idea_id: UUID) -> None:
        """
        Increment the view count of an idea
        """
        self.repository.increment_view_count(idea_id)
    
    def upvote_idea(self, idea_id: UUID) -> None:
        """
        Increment the upvotes of an idea
        """
        self.repository.upvote(idea_id)
    
    def downvote_idea(self, idea_id: UUID) -> None:
        """
        Increment the downvotes of an idea
        """
        self.repository.downvote(idea_id) 