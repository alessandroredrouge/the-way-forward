import os
from openai import AsyncOpenAI
from typing import Dict, Any, Optional
from app.core.config import settings

class LLMProvider:
    def __init__(self):
        self.client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
        self.default_model = "gpt-4o-mini"
    
    async def complete(
        self, 
        prompt: str, 
        model: Optional[str] = None,
        temperature: float = 0.7
    ) -> str:
        """
        Send a completion request to the LLM and return the response.
        
        Args:
            prompt: The prompt to send to the LLM
            model: The model to use (defaults to gpt-4o-mini)
            max_tokens: Maximum tokens in the response
            temperature: Controls randomness (0-1)
            
        Returns:
            The text response from the LLM
        """
        try:
            response = await self.client.chat.completions.create(
                model=model or self.default_model,
                temperature=temperature,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            return response.choices[0].message.content or ""
        except Exception as e:
            # Log the error
            print(f"Error calling LLM: {str(e)}")
            raise
