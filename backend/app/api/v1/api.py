from fastapi import APIRouter
from app.api.v1.endpoints import ideas, users, podcasts, resources

api_router = APIRouter()

api_router.include_router(ideas.router, prefix="/ideas", tags=["ideas"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(podcasts.router, prefix="/podcasts", tags=["podcasts"])
api_router.include_router(resources.router, prefix="/resources", tags=["resources"]) 