import requests
import json

host = "127.0.0.1"
port = "5000"
url = host + ":" + port
api = "/test"
url = "http://"+host+":"+port

print("Testing api call to: " + url+api)

try:
	print("\nCalling test route..")
	r = requests.get(url+api)
	response = r.json()
	message = response['message']
	print("\nMessage returned:")
	print(message)
except Exception as e:
	print("\nError requesting localhost test api: ")
	print(e)