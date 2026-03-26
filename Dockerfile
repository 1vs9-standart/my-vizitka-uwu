FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5002

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:5002/health')"]

CMD ["gunicorn", "-w", "1", "--threads", "2", "-b", "0.0.0.0:5002", "--timeout", "120", "app:app"]
