# DRCRM - CS50 Web Programming with Python and JavaScript Final Project

## Video Demo
[CS50W: Capstone | DRCRM](https://youtu.be/mJvWJmLv1Og?feature=shared)

## Introduction

This project is a Customer Relationship Management (CRM) web application developed as my ***capstone*** project for the CS50 Web Programming with Python and JavaScript course. The application is designed to help **small** businesses manage their customers, leads, and interactions. The backend is built using Django Rest Framework (DRF), and the frontend is developed with React and TypeScript, utilizing Tailwind CSS for styling. For HTTP requests, the Axios library is used, and PostgreSQL is the primary database, running on Docker.

I chose this project because it simulate real-world business needs, providing an all-in-one solution for managing customer relations effectively. This project allowed me to dive deeper into full-stack development and learn to integrate various modern technologies. The process involved overcoming several challenges, making API endpoints using Django Rest Framework, and creating a responsive user interface with React and Typescript.

## Distinctiveness and Complexity

This project satisfies the distinctiveness and complexity requirements in several ways:

1. **Integration of Modern Technologies**: The project integrates Django Rest Framework for the backend, React with TypeScript for the frontend, and Tailwind CSS for styling. This combination is not covered in the standard CS50 Web development curriculum, which makes a higher level of complexity and modern web development practices.

2. **Full-Stack Development**: The backend is responsible for handling API requests, data management, and logic, while the frontend focuses on providing a responsive and interactive user interface. This separation of concerns ensures a modular and maintainable codebase.

3. **Docker and PostgreSQL**: The use of Docker for PostgreSQL as the database adds another layer of complexity. PostgreSQL offers advanced database functionalities suitable for a production environment, and Docker provides a consistent development environment.

4. **CRUD Operations**: The application supports Create, Read, Update, and Delete (CRUD) operations for customers, leads, and interactions. Implementing these operations with proper validation and error handling adds to the project's complexity.

5. **TypeScript**: By using TypeScript in the frontend, the project benefits from static typing, which helps catch errors early in the development process and improves the overall robustness and maintainability of the codebase.

## Project Structure

The project is organized as follows:

* `backend/`
  * `api/`
    * `models.py` - Defines the database models for customers, leads, and interactions. Also modified User
    * `views.py` - API views to handle HTTP requests
    * `serializers.py` - Serializers for API responses
    * `urls.py` - URL routes for API endpoints
  * `settings.py` - Django settings, configured to handle PostgreSQL database and project dependencies
  * `requirements.txt` - List of Python packages required for the backend
* `frontend/`
  * `src/`
    * `components/` - Contains reusable React components like forms, inputs, and buttons.
    * `services/` - Includes API service functions using Axios
    * `pages/` - Defines the main pages of the application, such as customer, lead, and interaction views
    * `App.tsx` - Main react application component
    * `index.tsx` - Entry point for the React app
  * `tailwind.config.js` - Tailwind CSS config file
  * `tsconfig.json` - TypeScript config file
  * `package.json` - List of npm packages required for the frontend

## How to Run

### Clone the repository

#### Backend

1. `git clone https://github.com/slackerkids/drcrm.git`
2. `python3 -m venv .venv`
3. `source .venv/bin/activate`
4. `pip install -r requirements.txt`
5. `python3 manage.py makemigrations api`
   - Use sqlite or postgres. (Need to change `backend/settings.py`)
6. `python3 manage.py migrate`
   - Optional, create Django admin `python3 manage.py createsuperuser`
7. `python3 manage.py runserver`

#### Frontend

1. `cd frontend`
2. `npm install`
3. `npm run dev`

#### Docker and PostgreSQL

1. Ensure Docker is installed and running.
2. `docker pull postgres`
3. `docker run --name postgres -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres`

## Additional Information

* API endpoints are secured with **JWT** token-based authentication.
* Notable third-party libraries include Axios for HTTP requests and Tailwind CSS for styling.
* Ensure environment variables are set up correctly for JWT authentication and database connection. in `.env` files