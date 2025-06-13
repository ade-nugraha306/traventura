const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const crypto = require('crypto')
const cors = require('cors')
const fs = require('fs')
const app = express()
dotenv.config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

// import routes
const placeRoutes = require('./router/placeRoutes')
const bookingRoutes = require('./router/bookingRoutes')
const authRoutes = require('./router/authRoutes')
const commentRoutes = require('./router/commentRoutes')
const searchRoutes = require('./router/searchRoutes')

const cookieParser = require('cookie-parser')

app.use(express.static('public'))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err))

// autogenerate token jika belum ada
app.use((req, res, next) => {
    if(!req.cookies.token){
        const token = crypto.randomBytes(16).toString('hex');
        res.cookie('token', token, {httpOnly: true});
    }
    next();
});

app.get('/', (req, res)=>{
    res.send('Hello World!')
})

app.use('/api', placeRoutes)
app.use('/api', bookingRoutes)
app.use('/api', commentRoutes)
app.use('/api', authRoutes)
app.use('/api', searchRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});