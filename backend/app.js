const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT || 4000
const morgan=require('morgan')
const cors=require('cors');
const postRoute=require('./routes/postRoute')
const userRoute=require('./routes/userRoute')

//requiring jsonwebtoken
const jwt=require('jsonwebtoken')
// const methodOverride = require('method-override');
const connectDB = require('./db/connection')
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
connectDB()
app.use('/blog',postRoute)
app.use('/user',userRoute)
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
