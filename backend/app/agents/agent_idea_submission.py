from json import tool
from smolagents import CodeAgent, DuckDuckGoSearchTool, LiteLLMModel, tool, VisitWebpageTool
import os
import json
from typing import Dict, Any


@tool
def market_estimate_tool() -> int:
    """
    Provides the market estimate.

    """
    return 69

humanity_challenges = ["Climate Change", "AI Ethics", "Other Challenges"]
time_horizons = ["Less than 1 year", "1-5 years", "5-10 years", "More than 10 years"]
statuses = ["Early-stage", "Pilot", "Proven", "Scaling"]

form_prompt= f"""
You are an expert AI assistant that helps users fill out idea submission forms.
Your goal is to analyze the user's idea description thoroughly and extract relevant information to populate the form fields.
If information for a field is not provided, use the agents available to you to get the information.
The agents are:
- web_agent (for web search)
- market_agent (for market estimate)

To use the agents, you can use the following format:
# {"Description of what you want to do"}           
{"Task name made by you"} = {"agent name"}(task="{"Task description for the agent"}")

Never make up information, only base your answers on the information provided by the user or your tools.
For list fields, provide items as a comma-separated list.
For the market_estimate field, provide a numeric value.

Try to write an answer for each field at least once. If you can't after two tries, leave it blank. Use the agents to get external information when needed.

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
- business_model: How the idea will generate revenue or sustain itself. Make it a short, coincise description.
- technologies: List of technologies potentially used, and be specific (max 5).
- competition: List of competing companies (max 5)
- status: Current status of the idea (must match one of the predefined statuses, which are: {statuses} )
- sources: List of sources or references. Insert the 3 main sources used, separated by commas. E.g., "Source 1 (https://www.example1.com), Source 2 (https://www.example2.com)"

Optional fields:
- ideal_customer_profile: Description of the ideal customer (max 100 words)
- skills_required: List of skills needed to implement the idea (max 5)
- potential_investors: List of potential investors in the following format: "Company Name (Type of investor, e.g. VC, Angel, etc.), Company Name (Type of investor, e.g. VC, Angel, etc.), etc."
- potential_customers: List of potential customers in the following format: "Company Name (Type of customer, e.g. Enterprise, Government, etc.), Company Name (Type of customer, e.g. Enterprise, Government, etc.), etc."
- contacts: List of relevant contacts in the following format: "Name (Role - Company) - Contact info, Name (Role - Company) - Contact info, etc."
- collaboration_groups: List of groups to collaborate with in the following format: "Group Name (Type of group, e.g. NGO, University, etc.), Group Name (Type of group, e.g. NGO, University, etc.), etc."
- similar_ideas: List of similar ideas in the following format: "Idea 1 (Description), Idea 2 (Description), etc."
- other: Any other relevant information not included in the other fields.that you think is important to know.

IMPORTANT: Do NOT include 'author' or 'type_of_author' fields in your response. These will be handled separately by the system.
"""

model = LiteLLMModel(
    "gpt-4o-mini",
    temperature=0.2,
    api_key=os.environ["OPENAI_API_KEY"]
)

web_agent = CodeAgent(
    tools=[DuckDuckGoSearchTool(),VisitWebpageTool()],
    model=model,
    name="web_agent",
    description="The web_agent is responsible for searching the web for information.",
    verbosity_level=0,
    additional_authorized_imports=['json'],
    max_steps=4
)

market_agent = CodeAgent(
    tools=[market_estimate_tool],
    model=model,
    name="market_agent",
    description="The market_agent is responsible for estimating the market size of the idea.",
    verbosity_level=0,
    additional_authorized_imports=['json'],
    max_steps=1
)

manager_agent = CodeAgent(
    tools=[], 
    managed_agents=[web_agent, market_agent],
    model=model, 
    additional_authorized_imports=['json'],
    max_steps=25,
    planning_interval=5,
    verbosity_level=2
    )


def analyze_idea_description(description: str) -> Dict[str, Any]:
    """
    Analyze an idea description using the agent and return the form data.
    
    Args:
        description: The idea description from the frontend
        
    Returns:
        A dictionary containing the form data
    """
    # Run the agent with the description
    result = manager_agent.run(form_prompt + "Here is the idea description: " + description)
    
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