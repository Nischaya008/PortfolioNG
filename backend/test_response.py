import requests
import json

def test_chat():
    url = "http://localhost:8000/api/nisbot"
    payload = {
        "message": "Tell me about yourself"
    }
    headers = {
        "Content-Type": "application/json"
    }
    
    try:
        print("Sending request to http://localhost:8000/api/nisbot...")
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 200:
            data = response.json()
            reply = data.get('reply', 'No reply found')
            
            with open("response_log.txt", "w", encoding="utf-8") as f:
                f.write(reply)
                
            print(f"Response written to response_log.txt ({len(reply)} chars)")
        else:
            print(f"Error: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"Failed to connect: {e}")

if __name__ == "__main__":
    test_chat()
