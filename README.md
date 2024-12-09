# Weather web

A real-time weather fetch built with Node.js and MySQL.

---

## Getting Started

This is a real-time weather application where view weather in real-time.

---

## Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

---

## Installation

Follow the steps below to install and set up the project.

1. Clone the repository:

    ```bash
    git clone https://github.com/Om6214/weather-website.git
    ```

2. Navigate to the `Backend` folder:

    ```bash
    cd Backend
    npm install
    ```

3. Create a `.env` file inside the `Backend` folder with the following content:

    ```env
    host=localhost
    user=your username
    password=your password
    database=real_time_comments
    ```

4. Run the SQL queries to set up the database:

    ```sql
    CREATE DATABASE weather_db;

    USE weather_db;

    -- Users table
    CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );

    -- Weather searches table
    CREATE TABLE weather_searches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    city VARCHAR(255) NOT NULL,
    weather_data JSON NOT NULL,
    search_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    );
    ```

5. Install required NPM packages for the backend:

    ```bash
    npm install
    ```

6. Start the backend server:

    ```bash
    npm start
    ```

7. Navigate to the root folder and then to the `Client` folder:

    ```bash
    cd ..
    cd Client
    ```

8. Install required NPM packages for the frontend:

    ```bash
    npm install
    ```

9. Start the frontend server:

    ```bash
    npm run dev
    ```

10. Navigate to `http://localhost:<port>` in your browser. Replace `<port>` with the actual port number (usually `3000` for the frontend).

---

## Usage

Once both the backend and frontend servers are running, you can access the application by visiting `http://localhost:<frontend_port>`.

---

