# PortfolioNG + NisBot

A personal portfolio website featuring **NisBot**, a RAG-powered AI agent that answers interview questions based on Nischaya's resume.

## 🚀 How to Run Locally

You need to run both the **Frontend** and the **Backend** terminals.

### 1. Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Groq API Key (in `.env`)

### 2. Setup (First Time Only)
**Frontend:**
```bash
npm install
```

**Backend:**
```bash
pip install -r backend/requirements.txt
# Create .env file with GROQ_API_KEY=gsk_...
python backend/ingest.py  # Process the resume PDF
```

### 3. Start Servers
**Frontend (Terminal 1):**
```bash
npm run dev
```
> Runs on `http://localhost:5173`

**Backend (Terminal 2):**
```bash
.\start_backend.bat
# OR manually:
# cd backend
# python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
> Runs on `http://localhost:8000` (API at `/api/nisbot`)

## 🛠 Deployment

- **Frontend**: Vercel (Connect repo, standard Vite config).
- **Backend**: Render (Python 3.11, Build: `pip install -r requirements.txt`, Start: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`).
- **Env Vars**: Set `GROQ_API_KEY` in Render dashboard.
