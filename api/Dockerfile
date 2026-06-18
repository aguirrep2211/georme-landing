FROM python:3.13-alpine

WORKDIR /app

COPY server.py /app/server.py

USER nobody

EXPOSE 8080

CMD ["python", "/app/server.py"]
