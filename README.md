# E-Commerce App

A production-ready full-stack e-commerce application built using the MERN stack. 
The platform supports secure user authentication, product management, and user-specific cart functionality using RESTful APIs and JWT-based authentication.


## Technologies Used
* MongoDB
* Express.js
* React.js
* Node.js
* HTML
* CSS

## Repository Structure
* `frontend/`: Manages the client-side user interface, product displays, and shopping cart management.
* `backend/`: Handles database interactions, server logic, and API endpoints.

## Setup Instructions

1.  Clone the repository to your local machine:
    ```bash
    git clone [https://github.com/sreyanth26/E-Commerce_App.git](https://github.com/sreyanth26/E-Commerce_App.git)
    ```

2.  Navigate into the backend folder and install the required packages:
    ```bash
    cd E-Commerce_App/backend
    npm install
    ```

3.  Navigate into the frontend folder and install the required packages:
    ```bash
    cd ../frontend
    npm install
    ```

## Execution

Launch the backend server:
```bash
cd backend
npm start
```
Launch the frontend server:
```bash
cd frontend
npm run dev
```

## Key Features

- User Registration & Login (JWT Authentication)
- Password hashing using bcrypt
- Add to Cart / Remove from Cart functionality
- User-specific cart persistence
- RESTful API architecture
- Protected routes
- MongoDB database integration

