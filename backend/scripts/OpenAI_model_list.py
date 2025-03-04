from openai import OpenAI
import os
from dotenv import load_dotenv  # You might need to pip install python-dotenv

# Load environment variables from .env file
load_dotenv()

client = OpenAI(
    api_key=os.environ["OPENAI_API_KEY"]
)
models = client.models.list()
for model in models:
    print(model.id)