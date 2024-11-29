# Task Management System

## Project Description
A simple and efficient Task Management System built with Node.js, Express.js, and SQLite, providing a straightforward CRUD (Create, Read, Update, Delete) API for managing tasks.
The application includes an API and a wonderful interactive frontend interface for testing and interacting with the endpoints.

![image](https://github.com/user-attachments/assets/f117d9b3-a6eb-4fb9-bc7a-56b6a048e913)


## Features
- Create new tasks with a title, description and due date.
- View all tasks
- Update existing tasks
- Toggle the status of the task to Pending/Completed
- Delete tasks
- Simple and intuitive RESTful API
- Interactive User Interface (Frontend)


## Technologies Used
- **Node.js** - Backend runtime
- **HTML/CSS/JS** - For the UI
- **Express.js** - Web framework for Node.js
- **SQLite** - Database
- **Postman** - For API testing
- **Render** - For Deployment

## Requirements
- Node.js (v14 or later)
- npm (Node Package Manager)
- SQLite
- Postman or any API testing tool (optional)

## Local Setup

### Prerequisites
1. Ensure you have Node.js and npm installed on your system.
2. Clone the repository to your local machine.

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/sobhik-sawdagar/Task-Management-System.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Task-Management-System
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Environment Configuration
The application uses SQLite as the database, so no additional database setup is required.

## API Endpoints

### 1. Create a Task
- **URL:** `/task/create`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2024-11-29"
  }
  ```

### 2. View All Tasks
- **URL:** `/task/viewtasks`
- **Method:** `GET`
- **Response:** Array of task objects

### 3. Update a Task
- **URL:** `/task/updatetask/:id`
- **Method:** `PUT`
- **Request Body:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "dueDate": "2024-11-21"
    "status": "Completed"
  }
  ```

### 4. Delete a Task
- **URL:** `/task/deletetask/:id`
- **Method:** `DELETE`

## Testing Endpoints
You can test the endpoints using:
- **Local Environment:** `http://localhost:3000`
- **Hosted Environment:** `https://task-management-system-yk06.onrender.com`

### Recommended API Testing Tools
- Postman
- cURL
- Any API Testing tool

## Live Demo
*Note:* As it is hosted on Render's free tier, the machine spins down during inactivity. Therefore, the first visit to the URL may take a few seconds to load. Please be patient.
Experience the Task Management System without local setup:
🌐 **Hosted URL:** https://task-management-system-yk06.onrender.com

## Contributing
Contributions, issues, and feature requests are welcome!

## License
This project is open-source
