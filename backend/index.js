const express = require('express')
const cors = require('cors')
const errorController = require('./controllers/errorController')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const AppError = require('./utils/AppError')
const multer = require('multer')
const app = express()
require("dotenv").config();


app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'));




const upload = multer({ dest: './uploads/' })

app.post('/upload', upload.single('file'), function (req, res, next) {
    res.status(200).json('image has been uploaded')
  })


app.use('/api/product', productRoutes )
app.use('/api/user', userRoutes)
app.use('/api/orders', ordersRoutes)

app.all('*', (req, res, next) => {
    return next(new AppError(`Ova stranica ${req.originalUrl} ne postoji`, 404));
});

app.use(errorController)

app.listen(8800, () => {
    console.log('contected 👩‍💻');
    
} )