# Pizza Website

## Overview

A simple pizza-selling website with functionality for both users and administrators:

### User Roles:

-   **Admin**:
    -   Add new dishes to the menu.
    -   Delete existing dishes from the menu.
-   **User**:
    -   View available dishes.
    -   Place orders for dishes.
    -   Add or update their address.
    -   Add and remove dishes from their favorites.
    -   Update personal information, such as name and password.

## Technologies Used

-   **Frontend**: ReactJS, Axios
-   **Backend**: NodeJS with TypeScript, Sequelize, MySQL

## Project Structure

The project is divided into two parts:

1. **Frontend**: ReactJS application.
2. **Backend**: NodeJS API server with TypeScript.

## Installation and Usage

### Account for admin: username:admin, password:admin

### Frontend Setup:

1. Navigate to the frontend directory:
    ```bash
    cd front-end
    ```
2. Download the React project dependencies:
    ```bash
    npm install
    ```
3. Start the React development server:
    ```bash
    npm start
    ```

### Backend Setup:

1. Navigate to the backend directory:
    ```bash
    cd back-end
    ```
2. Download the backend project dependencies:
    ```bash
    npm install
    ```
3. Configure the database:

    - Open the file `back-end/src/config/db.config.ts`.
    - Update the database configuration (host, username, password, and database name) to match your environment.

4. Start the backend server:
    ```bash
    npm start
    ```

### Using the Website:

-   Open the React application in your browser (e.g., `http://localhost:3000`).
-   The backend API server should be running to handle requests (default port: `http://localhost:5000`).

Enjoy exploring the pizza website!
