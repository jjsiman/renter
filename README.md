# Renter

## Description

Let's not sugar coat it, it's a Zillow/Apartments.com/StreetEasy clone built for training and practice.

Started with [the fullstack scaffolding template](https://github.com/jjsiman/fullstack-docker-template).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation


### Git environment


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

1. Before running anything, change all instances of `renter` with your app name. Do not forget about `/backend/renter`. There is no need to configure anything for the frontend.
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

3. Set up the database

```
> python manage.py migrate
```

4. Start the server. The `0.0.0.0:8000` is required to communicate with Docker.

```
> python manage.py runserver 0.0.0.0:8000
```

### Frontend startup


1. Start the server

```
> npm run dev
```
