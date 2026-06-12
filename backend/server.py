from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Netram Molchand And Sons API")
api_router = APIRouter(prefix="/api")

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactSubmissionCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: Optional[str] = Field(default="", max_length=30)
    message: str = Field(..., min_length=1, max_length=2000)

class ContactSubmission(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Product(BaseModel):
    id: str
    name: str
    description: str
    price_inr: int
    unit: str
    image_url: str
    category: str

PRODUCTS: List[Product] = [
    Product(
        id="gulab-jamun",
        name="Gulab Jamun",
        description="Soft milk-solid dumplings slow-simmered in cardamom-rose syrup.",
        price_inr=600,
        unit="per kg",
        image_url="https://images.pexels.com/photos/9198596/pexels-photo-9198596.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        category="Mithai",
    ),
    Product(
        id="jalebi",
        name="Jalebi",
        description="Crisp saffron spirals soaked in fragrant sugar syrup, served warm.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863488/jalebi_lzu6th.avif",
        category="Mithai",
    ),
    Product(
        id="kaju-katli",
        name="Kaju Katli",
        description="Diamond-cut cashew fudge made with pure ghee and dressed with edible silver leaf.",
        price_inr=1100,
        unit="per kg",
        image_url="https://images.pexels.com/photos/18488310/pexels-photo-18488310.jpeg",
        category="Kaju ki mithai",
    ),
    Product(
        id="motichoor-laddoo",
        name="Motichoor Laddu",
        description="Intensely sweet and rich, primarily flavored with cardamom, saffron and pure ghee.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780999722/Motichoor-Ladoo.jpg_zkixvj.webp",
        category="Mithai",
    ),
    Product(
        id="besan-ladoo",
        name="Besan Laddu",
        description="Roasted gram flour ladoos with ghee, cardamom.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781103003/laddoo_web_ready_rpoo6y.jpg",
        category="Mithai",
    ),
    Product(
        id="kaju-kharbooja",
        name="Kaju Kharbooja",
        description="Made entirely of rich kaju and pistas.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863802/kaju-kharbooja_oj7e1p.jpg",
        category="Kaju ki mithai",
    ),
    Product(
        id="rasgulla",
        name="Rasgulla",
        description="Spongy chenna balls in light sugar syrup.",
        price_inr=20,
        unit="per piece",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863806/Rasgulla-2BRecipe-2Bin-2BPressure-2BCooker-e1626148996679-360x360_1_gcz9o1.jpg",
        category="Mithai",
    ),
    Product(
        id="soan-papdi",
        name="Soan Papdi",
        description="Flaky, melt-in-mouth gram flour layers crowned with pistachio.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863807/Soan-Papdi_li7jxy.jpg",
        category="Mithai",
    ),
    Product(
        id="mysore-pak",
        name="Mysore Pak",
        description="Rich ghee-laden gram flour fudge with a porous, buttery crumb.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863814/Untitled_design-2_jbl3ta.png",
        category="Mithai",
    ),
    Product(
        id="kaju-anjeer-barfi",
        name="Kaju Anjeer Barfi",
        description="Creamy texture of kaju and pista with the natural sweetness and pleasant crunch of anjeer.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781026582/Gemini_Generated_Image_o6b68ao6b68ao6b6_wj8yt1.png",
        category="Kaju ki mithai",
    ),
    Product(
        id="pista-barfi",
        name="Pista Roll",
        description="Emerald-green pistachio barfi finished with edible silver leaf.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863794/badam-pista-roll-278249_haliex.webp",
        category="Kaju ki mithai",
    ),
    Product(
        id="imarti",
        name="Imarti",
        description="Made from crisp, deep fried black gram batter piped into intricate floral rings and soaked in saffron-infused sugar syrup.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863800/IMG_7624_cwm2da.png",
        category="Mithai",
    ),
    Product(
        id="kaju-anjeer-roll",
        name="Kaju Anjeer Roll",
        description="Combines a rich, smooth outer layer of kaju with a chewy nutrient-dense inner filling of anjeer and mixed nuts.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863801/kaju_anjeer_roll_igmbxf.webp",
        category="Kaju ki mithai",
    ),
    Product(
        id="mango-laddu",
        name="Mango Laddu",
        description="It is a chewy, sweet, and tangy sweet made by rolling sun dried mango pulp with nuts, honey, khoya into bite sized balls.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780934429/IMG_7617_lxhokc.jpg",
        category="Mithai",
    ),
    Product(
        id="kesar-bite",
        name="Kesar Bite",
        description="It is made of kaju, badaam, sugar, heavily flavored with kesar and pure desi ghee.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863818/Untitled_design_djwxki.png",
        category="Kaju ki mithai",
    ),
    Product(
        id="kaju-roll",
        name="Kaju Roll",
        description="An elegant, premium cashew fudge roll filled with pistachios and draped in pure silver leaf.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863803/kaju-roll-415641_dvszae.jpg",
        category="Kaju ki mithai",
    ),
    Product(
        id="kaju-kalash",
        name="Kaju Kalash",
        description="Crafted from finely ground kajus, filled with a rich dry fruits stuffing, and topped with pistas and silver vark.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781102451/IMG_7770_yenx3w.heic",
        category="Kaju ki mithai",
    ),
    Product(
        id="kaju-samosa",
        name="Kaju Samosa",
        description="Crafted from kaju paste and rich dry fruit fillings.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781102451/IMG_7775_ahgza9.heic",
        category="Kaju ki mithai",
    ),
    Product(
        id="kala-kaand",
        name="Kala Kaand",
        description="Made by cooking condensed milk with khoya.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863803/Kalakand-3_dfbrmn.jpg",
        category="Mithai",
    ),
    Product(
        id="patisha",
        name="Patisha",
        description="Made from roasted gram flour, ghee and sugar.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781102451/IMG_7776_phnklh.heic",
        category="Mithai",
    ),
    Product(
        id="chenna-toast",
        name="Chenna Toast",
        description="Sweet made of spongy cottage cheese.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863796/chenna_toast_telwdn.webp",
        category="Mithai",
    ),
    Product(
        id="gujiya",
        name="Gujiya",
        description="It is a traditional Indian sweet, deep-fried.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863795/Best-Mawa-Gujiya-500x500_tv7tzu.jpg",
        category="Mithai",
    ),
    Product(
        id="coconut-barfi",
        name="Coconut Barfi",
        description="Coconut Khoya Barfi cooked with coconut.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863808/thengai-burfi_thumb1_znaxdo.webp",
        category="Mithai",
    ),
    Product(
        id="cream-cham-cham",
        name="Cream Cham Cham",
        description="Oval-shaped paneer dumplings.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863796/cream-cham-cham_jcrfpj.webp",
        category="Mithai",
    ),
    Product(
        id="khajoor-laddu",
        name="Khajoor Laddu",
        description="Made from mashed dates, roasted chopped nuts.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863795/8f325310-fb91-4c1c-a163-751001dd25d9_bp3wcd.png",
        category="Mithai",
    ),
    Product(
        id="standard-barfi",
        name="Standard Barfi",
        description="Fudge-like Indian sweet made primarily from milk.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863807/standard_barfi_etcveu.webp",
        category="Mithai",
    ),
    Product(
        id="bada-khasta",
        name="Bada Khasta",
        description="Deep-fried snack typically stuffed with a savory, spiced mixture of dal and spices.",
        price_inr=40,
        unit="per piece",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863802/IMG_7632_ojlkya.png",
        category="Namkeen",
    ),
    Product(
        id="laung-latta",
        name="Laung Latta",
        description="Laung Lata is a traditional, golden-fried pastry.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863798/images_muah7c.jpg",
        category="Mithai",
    ),
    Product(
        id="mango-chocolate-barfi",
        name="Mango Chocolate Barfi",
        description="Mango Chocolate Barfi is a premium, two-layered sweet.",
        price_inr=900,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863804/L1XWxyqEUZdo6rmbjpaMIk9KJnRiMOTmgSaZl9H0_sexoie.jpg",
        category="Mithai",
    ),
    Product(
        id="white-peda",
        name="White Peda",
        description="Semi-soft sweet made primarily from milk solids.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863805/pedawhite_bpbx8v.jpg",
        category="Mithai",
    ),
    Product(
        id="salted-kaju",
        name="Salted Kaju",
        description="Cashew nuts roasted to golden perfection.",
        price_inr=1600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863806/salted-caju_dtjo3g.webp",
        category="Namkeen",
    ),
    Product(
        id="kala-jaam",
        name="Kala Jaam",
        description="Popular Indian sweet made of deep-fried milk solids.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863809/Screenshot_2026-05-26_at_2.16.17_PM_curivk.png",
        category="Mithai",
    ),
    Product(
        id="chandrakala",
        name="Chandrakala",
        description="Stuffed with sweetened mawa and dry fruits.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780938430/IMG_7621_ad5djd.jpg",
        category="Mithai",
    ),
    Product(
        id="kesar-barfi",
        name="Kesar Barfi",
        description="Golden-hued Indian fudge made primarily from milk solids.",
        price_inr=300,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781016115/IMG_4516_2_z84jyj.jpg",
        category="Mithai",
    ),
    Product(
        id="dry-fruit-laddu",
        name="Dry Fruit Laddu",
        description="Made from chopped nuts, seeds, and dried fruits.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780938586/IMG_7626_bznx4s.jpg",
        category="Mithai",
    ),
    Product(
        id="mini-khasta",
        name="Mini Khasta",
        description="Stuffed with a dry, highly spiced lentil or pea filling.",
        price_inr=640,
        unit="per piece",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863807/mini_khasta_gjuzee.png",
        category="Namkeen",
    ),
    Product(
        id="chena-sandwich",
        name="Chena Sandwich",
        description="A soft, syrup-soaked sweet stuffed with rich filling.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863807/Screenshot_2026-05-26_at_3.57.06_PM_k25cgk.png",
        category="Mithai",
    ),
    Product(
        id="gol-mathri",
        name="Gol Mathri",
        description="Round-shaped, flaky North Indian cracker.",
        price_inr=192,
        unit="per 300g",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863798/golmathri_snmfyb.webp",
        category="Namkeen",
    ),
    Product(
        id="besan-mathri",
        name="Besan Mathri",
        description="A crispy, savory North Indian cracker made from gram flour.",
        price_inr=192,
        unit="per 300g",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863794/BEASN_wqbkqu.jpg",
        category="Namkeen",
    ),
    Product(
        id="channa-bite",
        name="Channa Bite",
        description="Bite-sized Indian sweet delicacy made primarily from chickpeas.",
        price_inr=900,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863796/channa-bite-sweet-mewa-bite_hdzmvs.jpg",
        category="Mithai",
    ),
    Product(
        id="masala-kaju",
        name="Masala Kaju",
        description="Made by roasting whole cashew nuts with spices.",
        price_inr=1600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863804/masala_kaju_nrdsih.webp",
        category="Namkeen",
    ),
    Product(
        id="masala-samosa",
        name="Masala Samosa",
        description="Crunchy treats packed with a spiced masala filling.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863804/masla_samosa_cami6i.jpg",
        category="Namkeen",
    ),
    Product(
        id="mangdal",
        name="Mangdal",
        description="Prepared using roasted yellow moong dal.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781015594/IMG_4520_tfstme.jpg",
        category="Mithai",
    ),
    Product(
        id="milk-cake",
        name="Milk Cake",
        description="Milk cake is a dense, grainy, and dual-toned sweet.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863809/MILKCAKE_h14f3l.webp",
        category="Mithai",
    ),
    Product(
        id="mewa-dalmoth",
        name="Mewa Dalmoth",
        description="Made of fried lentils and gram-flour noodles.",
        price_inr=960,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863805/MEWADALMOTH_sxkuud.webp",
        category="Namkeen",
    ),
    Product(
        id="mewa-ka-laddu",
        name="Mewa Ka Laddu",
        description="Mewa ke Laddu is a traditional, nutrient-dense sweet.",
        price_inr=900,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780939439/IMG_7634_mez9fy.jpg",
        category="Mithai",
    ),
    Product(
        id="dal-samosa",
        name="Dal Samosa",
        description="Crunchy treats packed with dal masala.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863804/masla_samosa_cami6i.jpg",
        category="Namkeen",
    ),
    Product(
        id="maath",
        name="Maath",
        description="Round-shaped, flaky North Indian cracker.",
        price_inr=192,
        unit="per 300g",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863804/maath_w1s2gm.webp",
        category="Namkeen",
    ),
    Product(
        id="balushahi",
        name="Balushahi",
        description="Sweet known for its flaky, multi-layered texture.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863805/maxresdefault_j9mqj9.jpg",
        category="Mithai",
    ),
    Product(
        id="doda-barfi",
        name="Doda Barfi",
        description="Heavily enriched with desi ghee and assorted dry fruits.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863794/AYKY6526_dvfq6p.webp",
        category="Mithai",
    ),
    Product(
        id="dahi",
        name="Dahi",
        description="Fermented dairy product.",
        price_inr=160,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863796/dahi_ina516.webp",
        category="Namkeen",
    ),
    Product(
        id="khasta-and-damalo",
        name="Khasta and Damalo",
        description="Crisp, flaky kachori with a fiery, tangy, slow-cooked filling.",
        price_inr=40,
        unit="per piece",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780937752/images_1_klg8tu.jpg",
        category="Namkeen",
    ),
    Product(
        id="kaju-masoor-dal",
        name="Kaju Masoor Dal",
        description="Made of crispy fried whole red lentils and cashews.",
        price_inr=640,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/v1780863801/kaju_masoor_dal_pd9zna.jpg",
        category="Namkeen",
    ),
    Product(
        id="rajbhog",
        name="Rajbhog",
        description="Saffron-flavored cottage cheese dumpling.",
        price_inr=40,
        unit="per piece",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863805/raj-bhog_nso0tv.webp",
        category="Mithai",
    ),
    Product(
        id="lal-peda",
        name="Lal Peda",
        description="Caramelizing milk solids with sugar.",
        price_inr=600,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781015941/IMG_4524_2_hj5od3.jpg",
        category="Mithai",
    ),
    Product(
        id="mathri-saakhein",
        name="Mathri (Saakhein)",
        description="A popular, flaky, and crispy North Indian cracker.",
        price_inr=192,
        unit="per 300g",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780863804/mathri_jw8sam.jpg",
        category="Namkeen",
    ),
    Product(
        id="meethi-mathri",
        name="Meethi Mathri",
        description="Deep-fried snack made from flour and spices.",
        price_inr=192,
        unit="per 300g",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1781016492/IMG_4528_2_tpqbjc.jpg",
        category="Namkeen",
    ),
    Product(
        id="pista-bite",
        name="Pista Bite",
        description="Sweet primarily made from high-quality pistachios.",
        price_inr=1400,
        unit="per kg",
        image_url="https://res.cloudinary.com/duiyvf4hb/image/upload/q_auto/f_auto/v1780940592/IMG_7628_dd29kj.jpg",
        category="Kaju ki mithai",
    ),
]
@api_router.get("/")
async def root():
    return {"message": "Netram Molchand And Sons API", "version": "1.0"}

@api_router.get("/products", response_model=List[Product])
async def list_products():
    return PRODUCTS

@api_router.get("/products/featured", response_model=List[Product])
async def featured_products():
    featured_ids = {"gulab-jamun", "jalebi", "kaju-katli", "motichoor-laddoo"}
    return [p for p in PRODUCTS if p.id in featured_ids]

@api_router.post("/contact", response_model=ContactSubmission, status_code=201)
async def submit_contact(payload: ContactSubmissionCreate):
    submission = ContactSubmission(
        name=payload.name.strip(),
        email=payload.email,
        phone=(payload.phone or "").strip(),
        message=payload.message.strip(),
    )
    doc = submission.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    try:
        await db.contact_submissions.insert_one(doc)
    except Exception as exc:
        logging.exception("Failed to store contact submission")
        raise HTTPException(status_code=500, detail="Could not save your message.") from exc
    return submission

app.include_router(api_router)
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()