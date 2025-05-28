# The Way Forward

## Overview

_The Way Forward_ is a web platform designed to be the source of truth for everything that matters - bridging today's challenges with tomorrow's solutions for humanity's prosperity. It aims to connect global challenges with innovative solutions while fostering collaboration and engagement among changemakers worldwide.

A key feature of this project is its AI-powered idea processing system, which assists users in submitting well-structured and comprehensive ideas.

## Key Features

- **Challenges Dashboard**: Tracks major global challenges with KPIs and visualizations.
- **Ideas Portal**: A central hub for collecting, submitting, and interacting with ideas. This is where the AI agent assists.
- **Knowledge Hub**: Provides curated resources, including podcasts and deep-dive articles.
- **Community Space**: Facilitates connection and collaboration among users.
- **User Profiles**: For managing preferences and tracking engagement.

## 🤖 AI Agent Implementation for Idea Submission

The platform utilizes an AI-driven system to enhance the idea submission process within the **Ideas Portal**.

### Purpose

The primary goal of the AI agent is to:

- Parse unstructured idea descriptions provided by users.
- Automatically populate the structured fields of the idea submission form.
- Enrich submissions by finding and suggesting relevant information if details are missing.
- Improve the quality and completeness of idea data.
- Simplify the submission experience for users.

### How it Works

1.  **User Input**: A user provides a natural language description of their idea.
2.  **Agent Analysis**: The AI agent, built using the `smol-agents` framework and `LiteLLM` with models like GPT-4o-mini, processes this text.
3.  **Information Extraction**: It identifies and extracts key information corresponding to predefined fields such as:
    - `title`
    - `humanity_challenge`
    - `category` and `sub_category`
    - `problem_statement`
    - `solution`
    - `why_now`
    - `market_estimate`
    - `business_model`
    - And other relevant fields as defined in the `PRD.md`.
4.  **Information Augmentation (if needed)**: If the initial description is sparse, the agent is equipped with tools like:
    - `DuckDuckGoSearchTool`: To search the web for missing information (e.g., market size, competitor details).
    - `VisitWebpageTool`: To visit and extract content from specific web pages.
5.  **Structured Output**: The agent returns a structured JSON object representing the populated form, which is then used by the backend.

### Technical Details

- **Backend Service**: The AI processing is handled by a Python FastAPI backend.
- **Core Logic**:
  - `backend/app/agents/agent_idea_submission.py`: Defines the agent's prompts, tools (including custom tools like `market_estimate_tool`), and the main `analyze_idea_description` function. It orchestrates the `CodeAgent` from `smol-agents`.
  - `backend/app/services/agent_service.py`: Acts as an intermediary, calling the agent logic and ensuring the output format is consistent and complete, including handling missing required fields and formatting list-based fields.
  - `backend/app/api/v1/endpoints/agents.py`: Exposes the `/analyze-idea` endpoint that receives the user's idea description and returns the AI-generated form data. It includes error handling and ensures sensitive fields like 'author' are not returned.
- **Agent Configuration**:
  - The `form_prompt` in `agent_idea_submission.py` provides detailed instructions to the LLM on how to fill the form, including field definitions, data types, and rules for using auxiliary agents (like `web_agent`).
  - The system uses a `manager_agent` that can orchestrate other agents (e.g., `web_agent`) to complete tasks.

## Technology Stack

### Frontend

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

### Backend

- Python
- FastAPI

### AI & Agents

- `smol-agents`
- `LiteLLM`
- OpenAI GPT models (e.g., GPT-4o-mini)
- DuckDuckGo Search Tool (for web research)

### Databases

- Supabase (PostgreSQL) for primary data and user authentication.
- (Potentially Pinecone for future vector search needs)

### Hosting

- Render (intended for frontend and backend)

## Getting Started

### Prerequisites

- Node.js and npm (for frontend development) - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Python 3.x (for backend development)
- Git

### Installation & Setup

1.  **Clone the repository**:

    ```sh
    git clone <YOUR_GIT_URL>
    cd <YOUR_PROJECT_NAME>
    ```

    _(Replace `<YOUR_GIT_URL>` and `<YOUR_PROJECT_NAME>` with actual values)_

2.  **Frontend**:

    ```sh
    cd frontend # Or your frontend directory
    npm install
    ```

3.  **Backend**:
    - Navigate to the backend directory:
      ```sh
      cd backend # Or your backend directory
      ```
    - Create a virtual environment:
      ```sh
      python -m venv venv
      source venv/bin/activate # On Windows use `venv\Scripts\activate`
      ```
    - Install Python dependencies:
      ```sh
      pip install -r requirements.txt
      ```
    - **Environment Variables**:
      The AI agent functionality requires an OpenAI API key. Set this in your environment:
      ```sh
      export OPENAI_API_KEY='your_openai_api_key_here'
      ```
      Or create a `.env` file in the `backend` directory and add `OPENAI_API_KEY='your_openai_api_key_here'`. Ensure `.env` is in your `.gitignore`.

### Running the Application

1.  **Start the Frontend Development Server**:

    ```sh
    cd frontend # Or your frontend directory
    npm run dev
    ```

2.  **Start the Backend Server**:
    ```sh
    cd backend # Or your backend directory
    source venv/bin/activate # If not already activated
    uvicorn app.main:app --reload --port 8000
    ```
    _(The backend will typically be available at `http://localhost:8000`)_

## Contributing

Details on how to contribute to the project will be added here.

## License

This project's license information will be added here.
