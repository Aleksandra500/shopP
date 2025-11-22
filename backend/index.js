const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const db = require('./db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const errorController = require('./controllers/errorController');
const AppError = require('./utils/AppError');

const app = express();git

// Parsiranje body-ja
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve statičkih fajlova (slike)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
// CORS konfiguracija
const allowedOrigins = [
    'http://localhost:5173', 
    'https://shop-p-ecru.vercel.app', // production
    'https://shop-p-aleksandras-projects-79a46c16.vercel.app' // preview
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true); // npr. curl ili mobilni app
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));

// Multer za upload slika
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Endpoint za upload slike
app.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).json({ status: 'success', filename: req.file.filename });
});

// API rute
app.use('/api/product', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/orders', ordersRoutes);

// 404 za nepostojeće rute
app.all('*', (req, res, next) => {
    next(new AppError(`Ova stranica ${req.originalUrl} ne postoji`, 404));
});

// Globalni error handler
app.use(errorController);

// Start servera
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
    console.log(`Server pokrenut na portu ${PORT} 👩‍💻`);
});
