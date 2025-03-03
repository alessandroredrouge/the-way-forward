class IdeaPrompts:
    @staticmethod
    def get_improvement_prompt(text: str) -> str:
        return f"""
        You are an expert at improving idea descriptions to make them clearer and more structured.
        
        I'll provide you with a raw idea description that may contain typos, ambiguities, or unclear explanations.
        Your task is to improve this description while:
        
        1. Maintaining the original idea's core concepts and intent
        2. Fixing typos and grammatical errors
        3. Clarifying ambiguous statements
        4. Structuring the content in a logical flow
        5. Making the description more readable for an AI agent that will later analyze it
        6. NOT adding new features or assumptions that weren't implied in the original text
        7. NOT changing the fundamental nature of the idea
        
        Here is the raw idea description:
        
        ```
        {text}
        ```
        
        Provide ONLY the improved version without any explanations, introductions, or additional commentary.
        """
