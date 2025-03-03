from typing import Dict, Any

from app.agents.agent_idea_submission import analyze_idea_description


class AgentService:
    """
    Service for handling agent-related functionality.
    """
    
    def analyze_idea_description(self, description: str) -> Dict[str, Any]:
        """
        Analyzes an idea description and extracts form fields.
        
        Args:
            description: The user's idea description
            
        Returns:
            A dictionary containing the extracted form fields
        """
        try:
            # Use the analyze_idea_description function from agent_idea_submission.py
            result = analyze_idea_description(description)
            
            # Ensure we have a valid result with all required fields
            required_fields = [
                "title", "humanity_challenge", "category", "sub_category",
                "geographic_focus", "time_horizon", "problem_statement",
                "solution", "why_now", "market_estimate", "business_model",
                "technologies", "competition", "status", "type_of_author",
                "author", "sources"
            ]
            
            # Add any missing required fields with empty values
            for field in required_fields:
                if field not in result:
                    if field in ["technologies", "sources"]:
                        result[field] = []
                    elif field == "market_estimate":
                        result[field] = 0
                    else:
                        result[field] = ""
            
            return result
        except Exception as e:
            # Log the error
            print(f"Error in agent service: {str(e)}")
            # Return a minimal valid form data structure
            return {
                "title": "Error analyzing idea",
                "humanity_challenge": "",
                "category": "",
                "sub_category": "",
                "geographic_focus": "",
                "time_horizon": "",
                "problem_statement": description[:100] + "..." if len(description) > 100 else description,
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
            }
