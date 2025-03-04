from json import tool
from smolagents import CodeAgent, DuckDuckGoSearchTool, LiteLLMModel, tool, VisitWebpageTool
import os
import json
from typing import Dict, Any

model = LiteLLMModel(
    "gpt-4o-mini",
    temperature=0.2,
    api_key=os.environ["OPENAI_API_KEY"]
)

@tool
def market_estimate_tool() -> int:
    """
    Provides the market estimate.

    """
    return 69

humanity_challenges = ["Climate Change", "AI Ethics", "Other Challenges"]
time_horizons = ["Less than 1 year", "1-5 years", "5-10 years", "More than 10 years"]

form_prompt= f"""
You are an expert AI assistant that helps users fill out idea submission forms.
Your goal is to analyze the user's idea description thoroughly and extract relevant information to populate the form fields.
If information for a field is not provided, access the web and other resources available to you to find the information.
Prioritize the use of the tools provided whenever they could be helpful.
The tools are:
- DuckDuckGoSearchTool: To search the web for information
- market_estimate_tool: To estimate the market size of the idea

Never make up information, only base your answers on the information provided by the user or your tools.
For list fields, provide items as a comma-separated list.
For the market_estimate field, provide a numeric value.

Ensure to write an answer for each field. Use the tools to get the information needed.

The form has the following fields:
- title: A concise title for the idea
- humanity_challenge: The main challenge the idea addresses (must match one of the predefined challenges, which are: {humanity_challenges} )
- category: The category of the idea, specifically related to the humanity challenge (e.g., "Climate Change" -> "Energy", "AI Ethics" -> "Mechanistic Interpretability")
- sub_category: A more specific category, related to the category
- geographic_focus: The geographic scope (local, regional, global, etc.)
- time_horizon: The timeframe for implementation (must match one of the predefined time horizons, which are: {time_horizons} )
- problem_statement: A clear statement of the problem being solved. Ensure to encapsulate the problem in detail, writing at least 2-3 sentences.
- solution: A description of the proposed solution. Ensure to encapsulate the solution in detail, writing at least 2-3 sentences.
- why_now: Why this idea is relevant and timely now. Ensure to write at least 2-3 sentences.
- market_estimate: Estimated market size in dollars (numeric value)
- business_model: How the idea will generate revenue or sustain itself
- technologies: List of technologies used
- competition: Description of competing solutions. Use the DuckDuckGoSearchTool and VisitWebpageTool to get the information. 
- status: Current status of the idea (early-stage, prototype, etc.)
- type_of_author: Type of person/entity submitting the idea
- author: Name of the author
- sources: List of sources or references. Insert the 3 main sources used, separated by commas. E.g., "Source 1 (https://www.example1.com), Source 2 (https://www.example2.com)"

Optional fields:
- ideal_customer_profile: Description of the ideal customer
- skills_required: List of skills needed to implement the idea
- potential_investors: List of potential investors. Use the DuckDuckGoSearchTool and VisitWebpageTool to get the information. 
- potential_customers: List of potential customers. Use the DuckDuckGoSearchTool and VisitWebpageTool to get the information. 
- contacts: List of relevant contacts. 
- collaboration_groups: List of groups to collaborate with. 
- similar_ideas: List of similar ideas. 
- other: Any other relevant information
"""

agent = CodeAgent(tools=[DuckDuckGoSearchTool(), VisitWebpageTool(), market_estimate_tool], model=model, additional_authorized_imports=['json'])


def analyze_idea_description(description: str) -> Dict[str, Any]:
    """
    Analyze an idea description using the agent and return the form data.
    
    Args:
        description: The idea description from the frontend
        
    Returns:
        A dictionary containing the form data
    """
    # Run the agent with the description
    result = agent.run(form_prompt + "Here is the idea description: " + description)
    
    # The agent's final output is a dictionary, but it might be returned as a string
    # representation of a dictionary or as an actual dictionary
    if isinstance(result, dict):
        return result
    
    # If it's a string, try to extract the dictionary part
    if isinstance(result, str):
        # Try to parse the result as JSON
        try:
            import json
            import re
            
            # First, check if the result contains a dictionary-like structure
            dict_match = re.search(r'({.*})', result, re.DOTALL)
            if dict_match:
                try:
                    return json.loads(dict_match.group(1).replace("'", '"'))
                except:
                    pass
            
            # If that fails, look for the "Final answer:" pattern in the output
            final_answer_match = re.search(r'Final answer: ({.*})', result, re.DOTALL)
            if final_answer_match:
                try:
                    return json.loads(final_answer_match.group(1).replace("'", '"'))
                except:
                    pass
            
            # If all else fails, try to evaluate the string as a Python literal
            import ast
            try:
                return ast.literal_eval(result)
            except:
                pass
        except:
            # If parsing fails, return a simple dictionary
            return {
                "title": "Generated from description",
                "problem_statement": description[:100] + "..." if len(description) > 100 else description
            }
    
    # If parsing fails, return a simple dictionary
    return {
        "title": "Generated from description",
        "problem_statement": description[:100] + "..." if len(description) > 100 else description
    }