# Project Name

## Description
This project is a full-stack application with a React frontend and a Node.js backend using a MySQL database.

## Features
- User authentication and authorization
- Database integration with MySQL
- RESTful API for data management
- Responsive UI built with React

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/yourproject.git
   ```
2. Navigate to the project directory:
   ```sh
   cd yourproject
   ```
3. Install dependencies for the frontend and backend:
   ```sh
   cd frontend
   npm install
   cd ../backend
   npm install
   ```

## Database Setup
This project uses MySQL as its database. To configure it:

1. Create a MySQL database.
2. Import the provided SQL file:
   ```sh
   mysql -u your_user -p your_database < database.sql
   ```
3. Update the `.env` file in the backend folder with your database credentials:
   ```env
   DB_HOST=your_host
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=your_database
   ```

## Running the Application

1. Start the backend:
   ```sh
   cd backend
   npm run start
   ```
2. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```

## Deployment
To deploy this project, configure the environment variables and use a hosting service for the frontend and backend.

## Author
- Aleksandra500

