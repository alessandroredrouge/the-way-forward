from json import tool
from smolagents import CodeAgent, DuckDuckGoSearchTool, LiteLLMModel, tool
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


form_prompt= """
You are an expert AI assistant that helps users fill out idea submission forms.
Your goal is to analyze the user's idea description and extract relevant information to populate the form fields.
Use the tools provided when needed.
The tools are:
- DuckDuckGoSearchTool: To search the web for information
- market_estimate_tool: To estimate the market size of the idea

The form has the following fields:
- title: A concise title for the idea
- humanity_challenge: The main challenge the idea addresses (must match one of the predefined challenges)
- category: The category of the idea
- sub_category: A more specific category
- geographic_focus: The geographic scope (local, regional, global, etc.)
- time_horizon: The timeframe for implementation
- problem_statement: A clear statement of the problem being solved
- solution: A description of the proposed solution
- why_now: Why this idea is relevant and timely now
- market_estimate: Estimated market size in dollars (numeric value)
- business_model: How the idea will generate revenue or sustain itself
- technologies: List of technologies used
- competition: Description of competing solutions
- status: Current status of the idea (early-stage, prototype, etc.)
- type_of_author: Type of person/entity submitting the idea
- author: Name of the author
- sources: List of sources or references

Optional fields:
- ideal_customer_profile: Description of the ideal customer
- skills_required: List of skills needed to implement the idea
- potential_investors: List of potential investors
- potential_customers: List of potential customers
- contacts: List of relevant contacts
- collaboration_groups: List of groups to collaborate with
- similar_ideas: List of similar ideas
- other: Any other relevant information

Analyze the user's description thoroughly and extract as much information as possible.
If information for a field is not provided, access the web and other resources available to you to find the information.
Never make up information, only base your answers on the information provided by the user or your tools.
For list fields, provide items as a comma-separated list.
For the market_estimate field, provide a numeric value.
"""

# form_prompt= """
# You are an expert AI assistant that helps users fill out idea submission forms.
# Your goal is to analyze the user's idea description and extract relevant information to populate the form fields.
# Use the tools provided when needed.

# The form has the following fields:
# - title: A concise title for the idea
# - humanity_challenge: The main challenge the idea addresses (must match one of the predefined challenges)
# - category: The category of the idea
# - sub_category: A more specific category
# - geographic_focus: The geographic scope (local, regional, global, etc.)
# - time_horizon: The timeframe for implementation
# - problem_statement: A clear statement of the problem being solved
# - solution: A description of the proposed solution
# - why_now: Why this idea is relevant and timely now
# - market_estimate: Estimated market size in dollars (numeric value)
# - business_model: How the idea will generate revenue or sustain itself
# - technologies: List of technologies used
# - competition: Description of competing solutions
# - status: Current status of the idea (early-stage, prototype, etc.)
# - type_of_author: Type of person/entity submitting the idea
# - author: Name of the author
# - sources: List of sources or references

# Optional fields:
# - ideal_customer_profile: Description of the ideal customer
# - skills_required: List of skills needed to implement the idea
# - potential_investors: List of potential investors
# - potential_customers: List of potential customers
# - contacts: List of relevant contacts
# - collaboration_groups: List of groups to collaborate with
# - similar_ideas: List of similar ideas
# - other: Any other relevant information

# Analyze the user's description thoroughly and extract as much information as possible.
# If information for a field is not provided, make a reasonable inference based on the description.
# For list fields, provide items as a comma-separated list.
# For the market_estimate field, provide a numeric value.
# """

agent = CodeAgent(tools=[DuckDuckGoSearchTool(), market_estimate_tool], model=model, additional_authorized_imports=['json'])


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
    
    # Try to parse the result as JSON
    try:
        return json.loads(result)
    except:
        # If parsing fails, return a simple dictionary
        return {
            "title": "Generated from description",
            "problem_statement": description[:100] + "..." if len(description) > 100 else description
        }