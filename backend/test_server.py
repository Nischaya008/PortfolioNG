import requests
import sys

try:
    print("Testing Backend Connection to http://127.0.0.1:8000/health...")
    response = requests.get("http://127.0.0.1:8000/health")
    if response.status_code == 200:
        print("✅ SUCCESS: Backend is reachable!")
        print(response.json())
    else:
        print(f"❌ FAILED: Status Code {response.status_code}")
except Exception as e:
    print(f"❌ CRITICAL FAIL: Could not connect. {e}")
