Order Management System (Full Stack)

A full-stack Order Management System built with React, Node.js, Express, and MongoDB.
This project features admin authentication, full CRUD operations, real-time updates using Socket.IO,
and secure route protection using JWT.

Features:
- Admin Signup & Login using JWT
- Admin Dashboard to view, create, edit, and delete orders
- Smart filters by Product Name and Date
- Real-time updates for order changes using Socket.IO
- Protected frontend routes to prevent unauthorized access

Tech Stack:
Frontend:
- React (Vite)
- Axios
- React Router DOM
- Socket.IO Client

Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- Bcrypt (for hashing passwords)
- JSON Web Tokens (JWT)
- Socket.IO (for real-time communication)

Project Structure:
order-management/
├── client/                 # React frontend
│   ├── components/         # Pages & components
│   │   └── admin/          # Admin views (Login, Signup, Dashboard, etc.)
├── server/                 # Express backend
│   ├── controllers/        # Business logic for orders/admin
│   ├── models/             # Mongoose models
│   ├── routes/             # API endpoints
│   ├── config/             # Default admin, DB config
│   ├── server.js           # Main entry point
│   └── .env                # Environment config

Setup Instructions:

Backend:
1. Go to the backend directory:
   cd backend
   npm install

2. Create a .env file inside /server:
   MONGO_URI=mongodb://127.0.0.1:27017/order-management
   JWT_SECRET=yourSuperSecretKey
   PORT=5000

3. Start the backend server:
   npm start

Frontend:
1. Go to the frontend directory:
   cd frontend
   npm install

2. Start the React app:
   npm run dev

Default Admin Login:
Email: admin@example.com
Password: admin123

Key Functionalities:
- Admin Auth: JWT-based login, signup, and route protection
- Dashboard: View orders in a table with live filtering
- CRUD: Add, edit, delete customer orders
- Socket.IO: Real-time sync across sessions or tabs

Backend API Routes:
| Method | Endpoint               | Description               |
|--------|------------------------|---------------------------|
| POST   | /api/admin/signup      | Register new admin        |
| POST   | /api/admin/login       | Admin login               |
| GET    | /api/orders            | Get all orders (with filters) |
| POST   | /api/orders            | Create new order          |
| PUT    | /api/orders/:id        | Update existing order     |
| DELETE | /api/orders/:id        | Delete an order           |
