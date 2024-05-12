FROM python:3.10-slim-bullseye

# Create and work in code folder
WORKDIR /backend

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

COPY requirements.txt .

RUN pip install -r requirements.txt

ADD . .
