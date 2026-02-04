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

@app.post("/calculate")
def calculate(data: SalaryInput):
    heures_travaillees = data.heures
    heures_dimanches = data.heures_dimanche
    type = data.type
    heures_nuit = data.heures_nuit

    match type:
        case "AFTC": 
            salaire_base_mensu = 12.2561 * 151.67
            absence_entree_sortie = (151.67 - heures_travaillees) * 13.8253
            salaire_base = salaire_base_mensu - absence_entree_sortie
            indemnite_sujetion = 0.0921 * (heures_travaillees * 12.2561)
            majoration_dimanche = heures_dimanches * 7.86
            indemnite_precarite = 0.10* (salaire_base + indemnite_sujetion + majoration_dimanche +238)
            indemnite_conges_payes = 0.10 * (salaire_base + indemnite_sujetion + majoration_dimanche + indemnite_precarite+238)
            salaire_brut = salaire_base + indemnite_sujetion + majoration_dimanche + indemnite_precarite + indemnite_conges_payes + 238
            salaire_net = salaire_brut * 0.769
        case "LNA":
            salaire_base = 12.45 * heures_travaillees
            revalorisation_segur =  (heures_travaillees / 160) * 238
            indemnite_precarite = (salaire_base + revalorisation_segur) * 0.10
            indemnite_conges_payes = (salaire_base + revalorisation_segur + indemnite_precarite) *0.10
            salaire_brut = salaire_base  + revalorisation_segur +indemnite_precarite + indemnite_conges_payes
            salaire_net = salaire_brut * 0.782
        case "HPEL":
            salaire_base = 12.021 * heures_travaillees
            aug_forfaitaire = salaire_base / 56.7
            majoration_dimanche = heures_dimanches * 5.83
            revalorisation_segur = heures_travaillees * 1.358
            revalorisation_segur2 = heures_travaillees * 0.125
            rag_mensuelle = heures_travaillees* 0.6925
            indemnite_sujetion_nuit = heures_nuit * 2.215 
            indemnite_fin_de_contrat = 0.10 * (salaire_base + aug_forfaitaire + majoration_dimanche + revalorisation_segur + revalorisation_segur2 + rag_mensuelle +indemnite_sujetion_nuit)
            indemnite_conges_payes = 0.10 * (salaire_base + aug_forfaitaire + majoration_dimanche + revalorisation_segur + revalorisation_segur2 + rag_mensuelle + indemnite_sujetion_nuit + indemnite_fin_de_contrat)
            salaire_brut = salaire_base + aug_forfaitaire + majoration_dimanche + revalorisation_segur + revalorisation_segur2 + rag_mensuelle + indemnite_sujetion_nuit + indemnite_fin_de_contrat + indemnite_conges_payes
            salaire_net = salaire_brut * 0.7864
        case _:
            return {"error": "Type inconnu"}

 

    return {
        "heures_normales": heures_travaillees - heures_dimanches,
        "heures_dimanche": heures_dimanches,
        "heures_nuit": heures_nuit,
        "salaire_net": round(salaire_net, 2),
        "salaire_brut": round(salaire_brut, 2)
    }
