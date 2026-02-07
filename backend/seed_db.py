"""Seed SQLite with sample products. Idempotent: only inserts if table is empty. Run: python seed_db.py"""
import sys
from database import SessionLocal, engine
from models import Product as ProductModel
from database import Base

Base.metadata.create_all(bind=engine)
db = SessionLocal()
if db.query(ProductModel).count() > 0:
    db.close()
    sys.exit(0)

products = [
    ProductModel(
        name="Professional Pruning Shears",
        description="Stainless steel blades, ergonomic handle. Perfect for trimming and shaping.",
        category="gardening_equipment",
        price=24.99,
        stock=50,
    ),
    ProductModel(
        name="Watering Can 2L",
        description="Classic galvanized steel watering can with rose attachment.",
        category="gardening_equipment",
        price=18.50,
        stock=30,
    ),
    ProductModel(
        name="Hand Trowel Set",
        description="Set of 3 trowels for digging, transplanting, and weeding.",
        category="gardening_equipment",
        price=14.99,
        stock=40,
    ),
    ProductModel(
        name="Lavender Bundle",
        description="Fresh dried lavender for scent and decoration.",
        category="flowers",
        price=12.00,
        stock=25,
    ),
    ProductModel(
        name="Sunflower Seeds Pack",
        description="Premium sunflower seeds for a bright summer garden.",
        category="flowers",
        price=6.99,
        stock=100,
    ),
    ProductModel(
        name="Mixed Wildflower Seeds",
        description="Bee-friendly mix for borders and meadows.",
        category="flowers",
        price=9.99,
        stock=80,
    ),
    ProductModel(
        name="Terracotta Pot 20cm",
        description="Classic terracotta pot with drainage hole.",
        category="pots",
        price=8.99,
        stock=60,
    ),
    ProductModel(
        name="Ceramic Planter Set",
        description="Set of 3 ceramic planters in sage green.",
        category="pots",
        price=32.00,
        stock=20,
    ),
    ProductModel(
        name="Hanging Basket with Coco Liner",
        description="Wire basket with coco liner for trailing plants.",
        category="pots",
        price=15.99,
        stock=35,
    ),
]

for p in products:
    db.add(p)
db.commit()
db.close()
print("Seeded", len(products), "products.")
