Start-Process powershell -ArgumentList "cd back; uvicorn main:app --reload --port 8000"
Start-Process powershell -ArgumentList "cd front; npm run dev"
