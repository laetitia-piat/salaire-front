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
    type: str


TAUX_HORAIRE = float(os.getenv("TAUX_HORAIRE", "12.2561"))   
MAJORATION_DIMANCHE = float(os.getenv("MAJORATION_DIMANCHE", "7.86"))

@app.get("/health")
def health():
    return {"ok": True}

@app.post("/calculate")
def calculate(data: SalaryInput):
    heuresTravaillees = data.heures
    heuresDimanches = data.heures_dimanche
    type = data.type

    match type:
        case "Tamaris": 
            salaireBaseMensu = TAUX_HORAIRE * 151.67
            absenceEntreeSortie = (151.67 - heuresTravaillees) * 13.8253
            salaireBase = salaireBaseMensu - absenceEntreeSortie
            indeminteSujetion = 0.0921 * (heuresTravaillees * TAUX_HORAIRE)
            majorationDimanche =heuresDimanches * MAJORATION_DIMANCHE
            indemnitePrecarite = 0.10* (salaireBase + indeminteSujetion + majorationDimanche +238)
            indemniteCongesPayes = 0.10 * (salaireBase + indeminteSujetion + majorationDimanche + indemnitePrecarite+238)
            salaireBrut = salaireBase + indeminteSujetion + majorationDimanche + indemnitePrecarite + indemniteCongesPayes + 238
            salaireNet = salaireBrut * 0.769
        case "Diabeto":
            salaireBase = 12.45 * heuresTravaillees
            revalorisationSegur =  (heuresTravaillees / 160) * 238
            indemnitePrecarite = (salaireBase + revalorisationSegur) * 0.10
            indemniteCongesPayes = (salaireBase + revalorisationSegur + indemnitePrecarite) *0.10
            salaireBrut = salaireBase  + revalorisationSegur +indemnitePrecarite + indemniteCongesPayes
            salaireNet = salaireBrut * 0.782
        case _:
            return {"error": "Type inconnu"}

 

    return {
        "heures_normales": heuresTravaillees - heuresDimanches,
        "heures_dimanche": heuresDimanches,
        "salaire_net": round(salaireNet, 2),
        "salaire_brut": round(salaireBrut, 2)
    }
