FROM python:3.10-bookworm

# Create and work in code folder
WORKDIR /workspace/

RUN python -m venv /venv
ENV PATH="/venv/bin:$PATH"

COPY . .

# Install pre-commit
RUN pip install -r requirements.txt
RUN pre-commit install

# Install app dependencies
WORKDIR /workspace/backend/
RUN pip install -r requirements.txt
