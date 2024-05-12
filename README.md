# Fullstack Scaffolding

## Description

A template for a basic monorepo application using Django (PostgreSQL) and Vue. It includes code quality features like `pre-commit`, `black`, `isort`, `eslint`, and `prettier`.
- Creates a default Django project.
- Creates a default, TypeScript enabled Vue project using Vite.

Currently:
- Python v.3.10
- Django v5.0.6
- Vue v3.4.21

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Clone this repository and rename the root folder (optional).

```
> git clone https://github.com/jjsiman/fullstack-docker-template.git [ROOT_FOLDER_NAME]
```

### Git environment

`pre-commit` needs to be installed outside of Docker due to the monorepo and Git. This is an area of the developer experience that could be improved.

1. Ensure Python is installed on your machine
2. Activate the virtual environment. Shown here on Windows:
```
> python -m venv venv
> /venv/Scripts/activate
```
3. Install monorepo dependencies
```
> pip install -r requirements.txt
```
4. Install `pre-commit` hooks
```
> pre-commit install
```

### Docker containers

Assuming Docker is already installed.

1. Before running anything, change all instances of `REPLACEME` with your app name. Do not forget about `/backend/REPLACEME`. There is no need to configure anything for the frontend.
2. Build and start the containers

```
> docker compose --profile fullstack up -d
```

## Usage

### Backend startup

Once the container is created, you'll need to start Django.

1. SSH into the `backend` container

```
> docker compose exec backend /bin/bash
```

2. Activate the virtual environment

```
> source activate
```

3. Set up the initial database

```
> python manage.py migrate
```

4. Start the server. The `0.0.0.0:8000` is required to communicate with Docker.

```
> python manage.py runserver 0.0.0.0:8000
```

### Frontend startup

Once the container is created, Vite is pretty much ready to go.

1. Start the server

```
> npm run dev
```
