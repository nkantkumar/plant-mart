import os

from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from database import engine, get_db, Base
from models import Product as ProductModel
from schemas import Product, ProductCreate

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Far Gardening API", version="1.0.0")

# CORS: allow frontend origin (set CORS_ORIGINS env for production, e.g. https://your-frontend.run.app)
_cors_origins = os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in _cors_origins],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Far Gardening API", "docs": "/docs"}


@app.get("/api/products", response_model=list[Product])
def list_products(
    db: Session = Depends(get_db),
    category: str | None = Query(None, description="Filter by category"),
    skip: int = 0,
    limit: int = 50,
):
    q = db.query(ProductModel)
    if category:
        q = q.filter(ProductModel.category == category)
    return q.offset(skip).limit(limit).all()


@app.get("/api/products/{product_id}", response_model=Product)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(ProductModel).filter(ProductModel.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@app.post("/api/products", response_model=Product)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = ProductModel(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product


@app.get("/api/categories")
def list_categories():
    return [
        {"id": "gardening_equipment", "label": "Gardening Equipment"},
        {"id": "flowers", "label": "Flowers"},
        {"id": "pots", "label": "Pots"},
    ]
