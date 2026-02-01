import chromadb
from sentence_transformers import SentenceTransformer
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "chroma_db")
COLLECTION_NAME = "resume_chunks"

class RAGEngine:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=DB_PATH)
        self.model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
        self.collection = self.client.get_collection(COLLECTION_NAME)

    def retrieve(self, query: str, top_k: int = 4) -> list[str]:
        query_embedding = self.model.encode([query]).tolist()
        
        results = self.collection.query(
            query_embeddings=query_embedding,
            n_results=top_k
        )
        
        # results['documents'] is a list of lists
        return results['documents'][0] if results['documents'] else []
