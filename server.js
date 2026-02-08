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
app.use(cors({
  origin: 'https://web-final-0ysh.onrender.com' // URL твоего фронтенда
}));
app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});