from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "The Way Forward"
    
    # CORS Settings
    BACKEND_CORS_ORIGINS: List[str] = [
        "http://localhost:5173",  # React development server
        "http://localhost:80",    # Production
    ]
    
    # Database Settings
    DATABASE_URL: str = os.getenv("DATABASE_URL", "")
    
    # JWT Settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-for-development")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # Supabase Settings
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    class Config:
        case_sensitive = True

settings = Settings() 