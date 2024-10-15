
# Tenant Management Application

This is a full-stack **Tenant Management** application built using **Node.js**, **Express**, **PostgreSQL** for the backend and **React**, **Tailwind CSS** for the frontend. The application demonstrates a multi-tenant architecture with secure authentication and tenant-specific data access.

## Project Overview

- **Backend**: Node.js, Express.js, PostgreSQL
- **Frontend**: React, Tailwind CSS
- **Authentication**: JWT (JSON Web Token)
- **Database**: PostgreSQL with Row-Level Security (RLS) to ensure tenant isolation

### Features

- **JWT Authentication**: Users log in using their email, and a JWT token is returned for further API requests.
- **Tenant-Specific Data**: Users can only access the orders and invoices that belong to their tenant.
- **Responsive UI**: Built with Tailwind CSS, the UI is responsive and simple.
- **Logout Functionality**: Users can log out, which clears their session and redirects them to the login page.

---

## Technologies Used

### Backend:

- **Node.js**: JavaScript runtime environment for building the server-side logic.
- **Express.js**: Framework for creating the API endpoints and handling routing.
- **PostgreSQL**: Relational database with Row-Level Security (RLS) to enforce tenant-based data isolation.
- **JWT**: JSON Web Tokens for secure authentication.
- **pg**: PostgreSQL client for Node.js to interact with the database.

### Frontend:

- **React**: Frontend library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.
- **Axios**: Promise-based HTTP client for making API requests.
- **React Router**: Handles client-side routing.

---

## Getting Started

### Prerequisites

To run this project, you'll need the following installed:

- [Node.js](https://nodejs.org/en/) (v12 or higher)
- [PostgreSQL](https://www.postgresql.org/download/) (v10 or higher)

### Setup Instructions

### 1. **Backend Setup**

#### Step 1: Clone the Backend

```bash
git clone <your-backend-repo-url>
cd backend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Setup PostgreSQL Database

Create a PostgreSQL database for your project and configure your tables. Here's an example for creating the tables with **Row-Level Security**:

```sql
-- Create the database
CREATE DATABASE tenant_db;

-- Switch to the database
\c tenant_db;

-- Create Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  tenant_id INTEGER NOT NULL
);

-- Create Orders Table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_description TEXT,
  tenant_id INTEGER NOT NULL
);

-- Create Invoices Table
CREATE TABLE invoices (
  id SERIAL PRIMARY KEY,
  invoice_description TEXT,
  tenant_id INTEGER NOT NULL
);

-- Enable Row-Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for tenants
CREATE POLICY tenant_order_access ON orders USING (tenant_id = current_setting('app.current_tenant')::INTEGER);
CREATE POLICY tenant_invoice_access ON invoices USING (tenant_id = current_setting('app.current_tenant')::INTEGER);
```

#### Step 4: Configure Environment Variables

Create a `.env` file in the backend root directory with the following environment variables:

```bash
PORT=3000
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tenant_db
JWT_SECRET=your_jwt_secret_key
```

#### Step 5: Run the Backend Server

```bash
npm start
```

The backend server will start on `http://localhost:3000`.

### 2. **Frontend Setup**

#### Step 1: Clone the Frontend

```bash
git clone <your-frontend-repo-url>
cd frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Start the Frontend Development Server

```bash
npm start
```

The frontend will be available at `http://localhost:3000`.

### 3. **Connecting Frontend to Backend**

Make sure that the backend API URL is properly configured in your frontend. In your frontend code (particularly where you're making API requests with Axios), the URL should point to `http://localhost:3000/api/`.

---

## API Endpoints

### **Authentication**

- **POST** `/api/auth/login`: Authenticates a user by email and returns a JWT token.

### **Orders**

- **GET** `/api/orders`: Retrieves the orders for the authenticated tenant (requires JWT in the Authorization header).

### **Invoices**

- **GET** `/api/invoices`: Retrieves the invoices for the authenticated tenant (requires JWT in the Authorization header).

---

## Authentication Flow

1. **Login**: The user logs in by providing their email, and the backend responds with a JWT token and username.
2. **Token Storage**: The token and username are stored in `localStorage` on the client-side.
3. **Protected Routes**: The frontend attaches the token in the `Authorization` header for protected routes (e.g., fetching orders and invoices).
4. **Logout**: On logout, the token is cleared from `localStorage`, and the user is redirected to the login page.

---

## Folder Structure

### Backend:

```
backend/
|-- config/        # Database configuration
|-- middleware/    # Authentication and other middlewares
|-- models/        # Database models for users, orders, and invoices
|-- routes/        # API routes for authentication, orders, and invoices
|-- app.js         # Main server file
```

### Frontend:

```
frontend/
|-- src/
   |-- components/     # Reusable components (Navbar, etc.)
   |-- pages/          # Individual pages (Login, Orders, Invoices, Home)
   |-- App.js          # Main app component
   |-- index.js        # Entry point for React
   |-- index.css       # Global styles with Tailwind imports
   |-- tailwind.config.js # Tailwind CSS configuration
```

---

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your needs.
