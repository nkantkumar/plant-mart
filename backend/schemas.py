from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    description: str | None = None
    category: str
    price: float
    image_url: str | None = None
    stock: int = 0


class ProductCreate(ProductBase):
    pass


class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True
