# Renter

A work in progress.

## Description

Let's not sugar coat it, it's a Zillow/Apartments.com/StreetEasy clone built for practice and demonstration purposes. Renter is a Vue SPA powered by a Django API and backend.

Started with and now influencing the design of [my fullstack scaffolding template](https://github.com/jjsiman/fullstack-docker-template).

### Notes on the Backend

I followed most of the standard Django recommendations during setup. This was augmented by some things I've picked up during my career like Django REST Framework, factory-boy dummy data, code formatting, etc.

### Notes on the Frontend
Vue. TypeScript. SCSS. Bootstrap. Simple enough. I've included linting powered by ESLint and Stylelint. I'd highly encourage installing the VS Code Extensions for these packages, otherwise be sure the files are linted before committing.


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
4. (Optional) Install `pre-commit` hooks. Pre-commit is added to the dev containers if you would like to use it there instead.
```
> pre-commit install
```

### Docker containers

Assuming Docker is already installed.

1. Build and start the containers

```
> cd path/to/renter
> docker compose --profile fullstack up -d
```

## Usage

### Backend startup

Once the container is created, you'll need to start Django.

1. SSH into the `backend` container (or attach VS Code to it)

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

4. Populate the database with dummy data

```
> python manage.py setup_data
```

5. Start the server. The `0.0.0.0:8000` is required to communicate with Docker.

```
> python manage.py runserver 0.0.0.0:8000
```

### Frontend startup

1. SSH into the `frontend` container (or attach VS Code to it)

```
> docker compose exec frontend /bin/bash
```

2. Start the server

```
> npm run dev
```

3. Navigate to http://localhost:3000
