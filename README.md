# API_Vac 💼💰

API de calcul de salaire pour des vacations, développée avec **FastAPI**.  
Cette API est utilisée comme **back-end** d’une application front en **Next.js**.

Elle permet de calculer le **salaire brut et net** à partir :
- du nombre d’heures travaillées
- du nombre d’heures effectuées le dimanche
- du type de vacation (ex : *Tamaris*, *Diabeto*)

---

## 🚀 Fonctionnalités

- API REST simple et rapide
- Calcul du salaire selon différentes règles métier
- Gestion de plusieurs types de vacations
- Prise en compte :
  - salaire de base
  - majoration dimanche
  - indemnité de sujétion
  - indemnité de précarité
  - indemnité de congés payés
  - revalorisation Ségur (proratisée)
- CORS configuré pour une utilisation avec un front (Next.js)
- Endpoints documentés automatiquement (Swagger)

---

## 🛠️ Stack technique

- **Python**
- **FastAPI**
- **Uvicorn**
- **Pydantic**
- Déploiement compatible **Railway**
- Consommée par un front **Next.js**

---

## 📁 Structure du projet

API_Vac/
├── main.py # Application FastAPI
├── requirements.txt # Dépendances Python
└── README.md


---

## ▶️ Lancer l’API en local
uvicorn main:app --reload --port 8000

### 1️⃣ Créer un environnement virtuel
python -m venv .venv
source .venv/bin/activate   # Windows : .venv\Scripts\activate

2️⃣ Installer les dépendances
pip install -r requirements.txt

3️⃣ Lancer le serveur
uvicorn main:app --reload --port 8000

📍 API disponible sur :
http://localhost:8000

---

🔍 Endpoints disponibles

####Health check
GET /health

Réponse :
{ "ok": true }


#Calcul du salaire
POST /calculate

Corps de la requête
{
  "heures": 120,
  "heures_dimanche": 16,
  "type": "Tamaris"
}
Réponse
{
  "heures_normales": 104,
  "heures_dimanche": 16,
  "salaire_net": 1850.32,
  "salaire_brut": 2405.78
}

