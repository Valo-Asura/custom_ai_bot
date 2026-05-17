import requests
import json
api_key = "AIzaSyD4R2n-Nb__VUyfwrIsAZtktFtV6EQ83Fc"
model = "gemini-embedding-2"
endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:batchEmbedContents?key={api_key}"
payload = {"requests": [{"model": f"models/{model}", "content": {"parts": [{"text": "Hello world"}]}}]}
r = requests.post(endpoint, json=payload)
print("batch:", r.status_code, r.text)
