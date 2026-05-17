from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

class SecurityGroup(BaseModel):
    id: int
    name: str
    description: str

class SecurityGroupCreate(BaseModel):
    name: str
    description: str

app = FastAPI(title="SG Securities Python Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"application": "SG Securities Python Service", "status": "healthy"}

@app.get("/security-groups")
async def list_security_groups():
    return [
        {"id": 1, "name": "SG-Internal", "description": "Internal access group"},
        {"id": 2, "name": "SG-External", "description": "External access group"}
    ]

@app.post("/security-group", status_code=201)
async def create_security_group(request: SecurityGroupCreate):
    return {"id": 42, "name": request.name, "description": request.description}
