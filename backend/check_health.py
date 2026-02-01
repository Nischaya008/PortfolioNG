import requests

try:
    resp = requests.get("http://localhost:8000/health")
    print(resp.status_code)
    print(resp.text)
except Exception as e:
    print(f"Health check failed: {e}")
