
# TaskTracking-ManagementApplication

# Welcome to the TaskTracking-ManagementApplication repository! This project is designed to manage tasks within teams efficiently.

# Features:
Task Management: Create, assign, and track tasks within teams.
User Management: Manage users and their roles.
Team Collaboration: Tasks are associated with teams for seamless collaboration.

# Technologies Used:
Backend: Node.js, Express.js, TypeScript
Database: MongoDB with Mongoose ORM

# Installation
To run this project locally, follow these steps:

Clone the repository: git clone https://github.com/vadivelansmart/TaskTracking-ManagementApplication.git
cd TaskTracking-ManagementApplication

1. Install dependencies: npm install
2. Set up environment variables:  
3. Create a .env file in the root directory.
4. Define environment variables like PORT, MONGODB_URI, etc.
5. The server should now be running on http://localhost:3000.

# API Endpoints:
Here are the endpoints provided in the TaskTracking-ManagementApplication repository:

# User Endpoints:

1. GET /users: Retrieve all users
2. GET /users/{id}: Retrieve a single user by ID
3. POST /users: Create a new user
4. PUT /users/{id}: Update a user by ID
5. DELETE /users/{id}: Delete a user by ID
6. POST /users/login: Authenticate a user and obtain a token
7. POST /users/register: Register a new user.

# Task Endpoints: 

1. GET /tasks: Retrieve all tasks
2. GET /tasks/{id}: Retrieve a single task by ID
3. POST /tasks/create: Create a new task
4. PUT /tasks/{id}: Update a task by ID
5. DELETE /tasks/{id}: Delete a task by ID

# Team Endpoints:

1. GET /teams: Retrieve all teams
2. GET /teams/{id}: Retrieve a single team by ID
3. POST /teams: Create a new team
4. PUT /teams/{id}: Update a team by ID
5. DELETE /teams/{id}: Delete a team by ID

# Authentication Endpoints:

1. POST /auth/login: Authenticate a user and obtain a token
2. POST /auth/register: Register a new user.


