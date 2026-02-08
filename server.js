const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/resource', require('./routes/apartmentRoutes'));
app.use('/api/weather', require('./routes/weatherRoutes'));

// Root route to serve Frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Global Error Handling Middleware (Requirement #5.3)
app.use((err, req, res, next) => {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

const cors = require('cors');

// Настройка CORS
app.use(cors({
  origin: ['https://web-final-0ysh.onrender.com', 'http://localhost:5000'],
  credentials: true
}));

// ВАЖНО: Сначала process.env.PORT (для Render), потом PORT из .env (для локалки)
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен! Порт: ${PORT}`);
});