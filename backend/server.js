const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const http = require('http'); // ✅ Required for socket server
const { Server } = require('socket.io');

const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const createDefaultAdmin = require('./config/defaultAdmin');

const app = express();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// ✅ Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173', // Your frontend Vite port
    methods: ['GET', 'POST']
  }
});

// ✅ Make `io` accessible in controllers
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    await createDefaultAdmin();

    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => console.error("❌ MongoDB connection error:", err));
