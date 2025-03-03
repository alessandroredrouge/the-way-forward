from app.llms.llm_basics import LLMProvider
from app.llms.prompts.idea_prompts import IdeaPrompts

class LLMService:
    def __init__(self):
        self.llm = LLMProvider()
        self.prompts = IdeaPrompts()
    
    async def improve_idea_text(self, text: str) -> str:
        """
        Improve an idea description to make it clearer and more structured.
        
        Args:
            text: The raw idea description text
            
        Returns:
            Improved version of the text
        """
        if not text or not text.strip():
            return ""
            
        prompt = self.prompts.get_improvement_prompt(text)
        
        try:
            improved_text = await self.llm.complete(
                prompt=prompt,
                temperature=0.3  # Lower temperature for more consistent results
            )
            return improved_text.strip()
        except Exception as e:
            # Log the error
            print(f"Error improving idea text: {str(e)}")
            raise
