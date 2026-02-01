from rag_engine import RAGEngine
import sys

def test_rag():
    print("Initializing RAG Engine...")
    try:
        rag = RAGEngine()
    except Exception as e:
        print(f"Failed to initialize RAG Engine: {e}")
        return

    queries = [
        "What is your experience with backend development?",
        "Tell me about a project you worked on.",
        "What skills do you have?",
    ]
    
    for q in queries:
        print(f"\nQUERY: {q}")
        results = rag.retrieve(q, top_k=2)
        if not results:
            print("  NO RESULTS FOUND")
        else:
            for i, r in enumerate(results):
                print(f"  RESULT {i+1}: {r[:100]}...")

if __name__ == "__main__":
    test_rag()
