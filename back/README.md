# API_Vac 💼💰

API de calcul de salaire pour des vacations, développée avec **FastAPI**.  
Cette API est utilisée comme **back-end** d’une application front en **Next.js**.

Elle permet de calculer le **salaire brut et net** à partir :

- du nombre d’heures travaillées
- du nombre d’heures effectuées le dimanche
- du lieu de vacation

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
├── requirements.txt
├── LICENCE
└── README.md

---

## 🔍 Endpoints disponibles

### Health check

GET /health

Réponse :
{ "ok": true }

### Calcul du salaire

POST /calculate

Corps de la requête
{
"heures": 120,
"heures_dimanche": 16,
"type": "Tamaris"
}
Réponse
{
"heures": 120,
"heures_dimanche": 16,
"salaire_net": 1850.32,
"salaire_brut": 2405.78
}

---

## 🌐 Déploiement

L’API est conçue pour être déployée sur Railway.

Commande de démarrage :

python -m uvicorn main:app --host 0.0.0.0 --port 8000

---

## 🔗 Projet associé

Cette API est consommée par un front-end développé en Next.js, avec Tailwind CSS pour l’interface utilisateur.

---

## ✨ Améliorations possibles

Ajout de nouveaux types de vacations
Tests unitaires
Export PDF / Excel
Historique des calculs
Authentification (optionnelle)

---

## 👩‍💻 Autrice

Laetitia Piat
Projet personnel de montée en compétences Fullstack (Next.js + FastAPI)

---

## Licence

Ce projet est sous licence MIT.  
Voir le fichier [LICENSE](./LICENSE).
