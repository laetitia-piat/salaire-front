import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins_env = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:3000",
)

allowed_origins = [o.strip() for o in origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SalaryInput(BaseModel):
    heures: float
    heures_dimanche: float
    heures_nuit: float
    type: str


@app.get("/health")
def health():
    return {"ok": True}

def calc_aftc(h: float, hd: float):
    salaire_base = 12.2561 * h
    indemnite_sujetion = 0.0921 * (h * 12.2561)
    majoration_dimanche = hd * 7.86
    segur = (h / 151.67) * 238
    base = salaire_base + indemnite_sujetion + majoration_dimanche + segur
    indemnite_precarite = base * 0.10 
    indemnite_conges_payes = (base + indemnite_precarite) * 0.10
    brut = base + indemnite_precarite + indemnite_conges_payes
    net = brut * 0.769
    return net, brut

def calc_lna(h: float):
    salaire_base = 12.45 * h
    segur =  (h / 160) * 238
    base = salaire_base + segur
    indemnite_precarite = base * 0.10
    indemnite_conges_payes = (base+ indemnite_precarite) * 0.10
    brut = base +indemnite_precarite + indemnite_conges_payes
    net = brut * 0.782
    return net, brut

def calc_hpel(h: float, hd: float, hn: float):
    salaire_base = 12.021 * h
    aug_forfaitaire = salaire_base / 56.7
    majoration_dimanche = hd * 5.83
    segur = (h * 1.358) + (h * 0.125)
    rag_mensuelle = h* 0.6925
    indemnite_sujetion_nuit = hn * 2.215 
    base = salaire_base + aug_forfaitaire + majoration_dimanche + segur + rag_mensuelle + indemnite_sujetion_nuit
    indemnite_fin_de_contrat = 0.10 * base
    indemnite_conges_payes = 0.10 * (base + indemnite_fin_de_contrat)
    brut =  base + indemnite_fin_de_contrat + indemnite_conges_payes
    net = brut * 0.7864
    return net, brut

@app.post("/calculate")
def calculate(data: SalaryInput):

    if data.type == "AFTC":
        net, brut = calc_aftc(data.heures, data.heures_dimanche)
    elif data.type == "LNA":
        net, brut = calc_lna(data.heures)
    elif data.type == "HPEL":
        net, brut = calc_hpel(data.heures, data.heures_dimanche, data.heures_nuit)
    else:
        return {"error": "Type inconnu"}

    return {
        "heures_normales": data.heures - data.heures_dimanche,
        "heures_dimanche": data.heures_dimanche,
        "heures_nuit": data.heures_nuit,
        "salaire_net": round(net, 2),
        "salaire_brut": round(brut, 2)
    }
