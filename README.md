# 💼💰 Calcul_salaire — Application Fullstack (Next.js + FastAPI)

Bienvenue sur **Calcul_salaire**, un projet **fullstack** permettant de calculer un **salaire brut et net** à partir du nombre d’heures travaillées, selon différentes règles métier liées aux vacations.

👉 Le projet est structuré comme un **monorepo** :

- un **frontend** en **Next.js** (déployé sur Vercel)
- un **backend** en **FastAPI** (déployé sur Railway)

Ce projet a été conçu comme un **projet personnel de montée en compétences fullstack**.

---

## 🌐 Démo en ligne

🔗 **Frontend (Vercel)** : [https://calculsalaire.vercel.app/](https://calculsalaire.vercel.app/)

Le front consomme directement l’API FastAPI déployée sur Railway.

---

## 🧠 Objectifs du projet

- Concevoir une application web moderne de bout en bout
- Mettre en pratique :
  - React / Next.js
  - API REST avec FastAPI
  - règles métier concrètes
- Déployer un front et un back en production
- Gérer les variables d’environnement
- Avoir un projet exploitable pour un **portfolio développeuse**

---

## 🧩 Fonctionnalités

### 📊 Côté Frontend

- Sélection de la structure / lieu de vacation
- Saisie :
  - nombre d’heures travaillées
  - heures effectuées le dimanche ou la nuit
- Calcul et affichage du **salaire net estimé**
- Interface claire et ergonomique

### ⚙️ Côté Backend (API)

- API REST rapide et simple
- Calcul du salaire selon différentes règles métier
- Gestion de plusieurs types de vacations
- Prise en compte :
  - salaire de base
  - majoration dimanche
  - indemnité de sujétion
  - indemnité de précarité
  - indemnité de congés payés
  - revalorisation Ségur (proratisée)

- CORS configuré pour une consommation par le front
- Documentation automatique via Swagger

---

## 🛠️ Stack technique

### Frontend

- **Next.js**
- **React**
- **TypeScript / JavaScript**
- **Tailwind CSS**
- Déploiement : **Vercel**

### Backend

- **Python**
- **FastAPI**
- **Uvicorn**
- **Pydantic**
- Déploiement : **Railway**

---

## 📁 Structure du projet

```
Calcul_salaire/
├── front/                 # Frontend Next.js
│   ├── app/
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── next.config.ts
│
├── back/                  # Backend FastAPI
│   ├── main.py
│   └── requirements.txt
│
├── README.md
└── LICENSE
```

---

## 🔍 API — Endpoints disponibles

### ✔️ Health check

**GET** `/health`

Réponse :

```json
{ "ok": true }
```

---

### 🧮 Calcul du salaire

**POST** `/calculate`

Corps de la requête :

```json
{
  "heures": 120,
  "heures_dimanche": 16,
  "type": "Tamaris"
}
```

Réponse :

```json
{
  "heures": 120,
  "heures_dimanche": 16,
  "salaire_net": 1850.32,
  "salaire_brut": 2405.78
}
```

---

## 🚀 Déploiement

### Backend (Railway)

Commande de démarrage :

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend (Vercel)

- Root directory : `front/`
- Variable d’environnement :

```env
NEXT_PUBLIC_API_URL=https://<url-api-railway>
```

---

## ✨ Améliorations possibles

- Ajout de nouveaux types de vacations
- Tests unitaires (front & back)
- Export des résultats (PDF / Excel)
- Historique des calculs
- Authentification (optionnelle)

---

## 👩‍💻 Autrice

**Laetitia Piat**
Développeuse Fullstack (Next.js + FastAPI)

👉 Projet personnel de montée en compétences

Tu peux me retrouver sur **GitHub** ou **LinkedIn** pour découvrir d’autres projets ou collaborer 🤝

---

## 📄 Licence

Ce projet est sous licence **MIT**.
Voir le fichier `LICENSE` pour plus de détails.
