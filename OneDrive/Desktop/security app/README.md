# SG Securities

This workspace contains a small security group application named **SG Securities** with two services:

- **Python service**: FastAPI service for security group operations.
- **.NET Core service**: ASP.NET Core minimal API for security group management.

## Components

- `python-service/`
  - `app.py`
  - `requirements.txt`
  - `Dockerfile`
- `dotnet-service/`
  - `SGSecurities.Api.csproj`
  - `Program.cs`
  - `Dockerfile`
- `k8s/sg-securities.yaml`

## Local startup

### Python service

```bash
cd "python-service"
python -m pip install -r requirements.txt
python -m uvicorn app:app --host 0.0.0.0 --port 8000
```

### .NET Core service

```bash
cd "dotnet-service"
dotnet run --urls "http://0.0.0.0:5000"
```

### UI interface

A React-based browser UI is available in the `ui/` folder.

To install dependencies and run the React app locally:

```bash
cd "ui"
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

The UI calls local services at:

- Python: `http://localhost:8000`
- .NET: `http://localhost:5000`

To build and run the UI in Docker:

```bash
cd "ui"
docker build -t sgsecurities-ui:latest .
docker run -p 3000:80 sgsecurities-ui:latest
```

## Kubernetes deployment (microservices architecture)

This repo now deploys two independent microservices in the same `sg-securities` namespace:

- `sg-securities-python` — Python FastAPI microservice
- `sg-securities-dotnet` — .NET minimal API microservice
- `sg-securities-gateway` — Kubernetes Ingress routing to both microservices

Build the container images first, then apply the manifest in `k8s/sg-securities.yaml`.

```bash
cd "c:\Users\Pritam\OneDrive\Desktop\security app"
docker build -t sgsecurities-python:latest ./python-service
docker build -t sgsecurities-dotnet:latest ./dotnet-service
kubectl apply -f k8s/sg-securities.yaml
```

Access the microservices through the ingress host and paths:

- `http://sg-securities.local/python/`
- `http://sg-securities.local/python/security-groups`
- `http://sg-securities.local/dotnet/`
- `http://sg-securities.local/dotnet/security-groups`

> Add `127.0.0.1 sg-securities.local` to `/etc/hosts` or your local DNS when using a local ingress controller.
