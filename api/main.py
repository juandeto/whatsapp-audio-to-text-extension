from fastapi import APIRouter, FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from routes import prefix_gpt

app = FastAPI(
            title="T2P_EXTENSION",
            docs_url='/api/docs',
            redoc_url='/api/redoc',
            openapi_url='/api/openapi.json'
)

prefix_router = APIRouter(prefix="/api")

@prefix_router.get("/")
def root():
    return {"message": "hello"}

origins=["chrome-extension://johpjlfhphhcjmdmnlpkjfnokheodpdp"]


app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)
app.include_router(prefix_router)
app.include_router(prefix_gpt)
