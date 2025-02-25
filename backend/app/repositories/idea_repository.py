from app.db.supabase import get_supabase_client
from app.schemas.idea import IdeaCreate, IdeaUpdate
from uuid import UUID
from typing import Dict, Any, List, Optional

class IdeaRepository:
    def __init__(self):
        self.supabase = get_supabase_client()
        self.table = "ideas"
    
    def get_all(self, limit: int = 100, offset: int = 0):
        """
        Get all ideas with pagination
        """
        return self.supabase.table(self.table).select("*").limit(limit).offset(offset).execute()
    
    def get_by_id(self, idea_id: UUID):
        """
        Get an idea by its ID
        """
        return self.supabase.table(self.table).select("*").eq("id", str(idea_id)).single().execute()
    
    def create(self, idea: Dict[str, Any]):
        """
        Create a new idea
        """
        return self.supabase.table(self.table).insert(idea).execute()
    
    def update(self, idea_id: UUID, idea: Dict[str, Any]):
        """
        Update an existing idea
        """
        return self.supabase.table(self.table).update(idea).eq("id", str(idea_id)).execute()
    
    def delete(self, idea_id: UUID):
        """
        Delete an idea
        """
        return self.supabase.table(self.table).delete().eq("id", str(idea_id)).execute()
    
    def search(self, query_params: Dict[str, Any]):
        """
        Search ideas based on query parameters
        """
        query = self.supabase.table(self.table).select("*")
        
        for key, value in query_params.items():
            if value is not None:
                if key in ["category", "sub_category", "status", "humanity_challenge"]:
                    query = query.eq(key, value)
                elif key in ["title", "problem_statement", "solution"]:
                    query = query.ilike(key, f"%{value}%")
        
        return query.execute()
    
    def increment_view_count(self, idea_id: UUID):
        """
        Increment the view count of an idea
        """
        idea = self.get_by_id(idea_id).data
        if idea:
            current_views = idea.get("view_count", 0)
            return self.supabase.table(self.table).update({"view_count": current_views + 1}).eq("id", str(idea_id)).execute()
        return None
    
    def upvote(self, idea_id: UUID):
        """
        Increment the upvotes of an idea
        """
        idea = self.get_by_id(idea_id).data
        if idea:
            current_upvotes = idea.get("upvotes", 0)
            return self.supabase.table(self.table).update({"upvotes": current_upvotes + 1}).eq("id", str(idea_id)).execute()
        return None
    
    def downvote(self, idea_id: UUID):
        """
        Increment the downvotes of an idea
        """
        idea = self.get_by_id(idea_id).data
        if idea:
            current_downvotes = idea.get("downvotes", 0)
            return self.supabase.table(self.table).update({"downvotes": current_downvotes + 1}).eq("id", str(idea_id)).execute()
        return None 