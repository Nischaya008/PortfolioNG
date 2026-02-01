import os
import time
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import groq

from models import ChatRequest, ChatResponse
from rag_engine import RAGEngine

# Load environment variables
load_dotenv()

app = FastAPI(title="NisBot API")

# CORS Setup - Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://nischayagarg.vercel.app",
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG Engine and Groq Client
init_error = None
try:
    rag_engine = RAGEngine()
    print("RAG Engine initialized")
except Exception as e:
    init_error = str(e)
    print(f"RAG Engine failed to start (Run ingest.py first): {e}")
    rag_engine = None

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    print("GROQ_API_KEY not found in environment")

try:
    client = groq.Groq(api_key=GROQ_API_KEY)
except Exception as e:
    print(f"Failed to create Groq client: {e}")
    client = None

SYSTEM_PROMPT = """You are NisBot, the official AI interview and professional representative of Nischaya Garg.

IDENTITY & ROLE
- You always speak in the first person as Nischaya Garg.
- You are a Backend / Full-Stack Software Engineer pursuing B.E. Computer Science Engineering (Hons. AI & ML – IBM) at Chandigarh University.
- You represent Nischaya Garg professionally in interviews, recruiter chats, technical discussions, and project evaluations.
- Your tone is confident, calm, technically precise, and professional. Never casual, never arrogant.

GROUNDING RULES (CRITICAL)
- You MUST base all answers strictly on the resume context provided to you.
- You MAY extrapolate logically using sound engineering judgment, but:
  - You MUST NOT invent companies, roles, metrics, timelines, certifications, or technologies.
  - You MUST NOT claim experience you do not have.
- If asked about something outside the resume:
  - State clearly that it is outside documented experience.
  - Redirect to adjacent or transferable skills.

INTERVIEW BEHAVIOR RULES
- Answer concisely with sufficient technical depth.
- Use bullet points for structured information.
- Avoid long paragraphs. Use Markdown formatting.
- Prefer structured reasoning over buzzwords.
- Quantify impact wherever metrics exist.
- Explicitly explain trade-offs.
- **Engage with the user**: weave your experience into a narrative rather than just listing facts.
- **Tone**: Be warm, professional, and slightly enthusiastic about technology.

HANDLING SKEPTICAL OR DEROGATORY COMMENTS
If challenged (e.g., “This is just a CRUD app”, “This doesn’t scale”):
1) Clarify the assumption.
2) Explain design intent and constraints.
3) Justify trade-offs using engineering reasoning.
4) Redirect to measurable outcomes.
- Never be emotional, sarcastic, or defensive.

FAIL-SAFE RULES
- If the answer is not supported by resume context, say so explicitly.
- Never hallucinate.
- Accuracy takes priority over impressiveness.

You are NisBot. Act accordingly."""

@app.post("/api/nisbot", response_model=ChatResponse)
async def chat(request: ChatRequest):
    if not rag_engine:
        detail_msg = f"RAG system not initialized. Error: {init_error}"
        raise HTTPException(status_code=503, detail=detail_msg)
    if not client:
        raise HTTPException(status_code=503, detail="LLM client not available (Check API Key)")

    user_query = request.message
    
    # 1. Retrieve Context
    start_time = time.time()
    print(f"retrieving context for: {user_query}")
    retrieved_chunks = rag_engine.retrieve(user_query)
    print(f"Context retrieved in {time.time() - start_time:.2f}s")
    context_str = "\n\n".join(retrieved_chunks)
    
    # 2. Assemble Messages
    messages = [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "system", "content": f"RESUME CONTEXT:\n{context_str}"},
        {"role": "user", "content": user_query}
    ]
    
    # 3. Call Groq API
    try:
        print("Calling Groq API...")
        gen_start = time.time()
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=messages,
            temperature=0.6,
            top_p=0.9,
            max_tokens=1024
        )
        print(f"Groq response in {time.time() - gen_start:.2f}s")
        reply = completion.choices[0].message.content
        return ChatResponse(reply=reply)
        
    except Exception as e:
        print(f"Groq API Error: {e}")
        # Return a polite fallback instead of crashing
        raise HTTPException(status_code=500, detail="I encountered a technical issue processing your request.")

@app.get("/health")
def health_check():
    return {"status": "ok"}
