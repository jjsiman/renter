FROM node:22-bookworm

RUN apt-get update && apt-get install -y python3-pip python3-venv

WORKDIR /workspace/

# Set up virtual environment for pre-commit
RUN python3 -m venv /venv
ENV PATH="/venv/bin:$PATH"

COPY /frontend/package*.json /workspace/frontend/

WORKDIR /workspace/frontend/

RUN npm install

WORKDIR /workspace/

COPY . .

# Install pre-commit
RUN pip install -r requirements.txt
RUN pre-commit install
