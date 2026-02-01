import os
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from pypdf import PdfReader
import re

# Configuration
RESUME_PATH = os.path.join(os.path.dirname(__file__), "assets", "Resume_NG.pdf")
DB_PATH = os.path.join(os.path.dirname(__file__), "chroma_db")
COLLECTION_NAME = "resume_chunks"

def text_to_chunks(text, chunk_size=1000, overlap=100):
    """
    Splits text into chunks while respecting sentence boundaries.
    """
    # Split by sentence delimiters (. ? ! or newline)
    sentences = re.split(r'(?<=[.?!])\s+|(?<=\n)\s+', text)
    
    chunks = []
    current_chunk = []
    current_length = 0
    
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence:
            continue
            
        sentence_len = len(sentence)
        
        # If adding this sentence exceeds chunk_size, save current chunk and start new one
        if current_length + sentence_len > chunk_size and current_chunk:
            # Join the current chunk
            chunk_text = " ".join(current_chunk)
            chunks.append(chunk_text)
            
            # Start new chunk with overlap if possible (simplified here: just start new)
            # Ideally we'd keep the last few sentences for overlap
            overlap_text = []
            overlap_len = 0
            # Backtrack to add overlap
            for s in reversed(current_chunk):
                if overlap_len + len(s) < overlap:
                    overlap_text.insert(0, s)
                    overlap_len += len(s)
                else:
                    break
            
            current_chunk = overlap_text + [sentence]
            current_length = overlap_len + sentence_len
        else:
            current_chunk.append(sentence)
            current_length += sentence_len
            
    # Add the last chunk
    if current_chunk:
        chunks.append(" ".join(current_chunk))
        
    return chunks

def ingest_resume():
    print(f"Loading resume from {RESUME_PATH}...")
    
    candidate_paths = [
        RESUME_PATH,
        "../public/assets/Resume_NG.pdf",
    ]
    
    path_to_use = None
    for path in candidate_paths:
        if os.path.exists(path):
            print(f"Found resume at: {path}")
            path_to_use = path
            break
            
    if not path_to_use:
        print("❌ Resume file not found in any candidate paths!")
        print(f"Propably looked in: {candidate_paths}")
        print(f"CWD: {os.getcwd()}")
        return

    # 1. Extract Text
    reader = PdfReader(path_to_use)
    full_text = ""
    for page in reader.pages:
        full_text += page.extract_text() + "\n"
    
    # Simple cleaning
    full_text = re.sub(r'\s+', ' ', full_text).strip()
    
    print(f"Extracted {len(full_text)} characters.")

    # 2. Chunk
    chunks = text_to_chunks(full_text)
    print(f"Created {len(chunks)} chunks.")

    # 3. Embed & Store
    print("Initializing ChromaDB...")
    client = chromadb.PersistentClient(path=DB_PATH)
    
    # Reset collection if exists
    try:
        client.delete_collection(COLLECTION_NAME)
    except:
        pass
        
    collection = client.create_collection(name=COLLECTION_NAME)
    
    print("Loading Embedding Model (all-MiniLM-L6-v2)...")
    model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
    
    embeddings = model.encode(chunks)
    
    ids = [f"chunk_{i}" for i in range(len(chunks))]
    metadatas = [{"source": "resume", "index": i} for i in range(len(chunks))]
    
    collection.add(
        documents=chunks,
        embeddings=embeddings.tolist(),
        metadatas=metadatas,
        ids=ids
    )
    
    print("✅ Ingestion complete!")

if __name__ == "__main__":
    ingest_resume()
