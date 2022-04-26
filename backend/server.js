const express = require('express')
const connectDB = require('./config/db')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT
const { errorHandler } = require('./middleware/errorMiddleware')

connectDB()
const app = express()

// middleware
app.use(cors())

// middleware body parser
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/users', require('./routes/usersRoutes'))
app.use('/api/movies', require('./routes/moviesRoutes'))
app.use('/api/moviesapi', require('./routes/moviesapiRoutes'))

app.use(errorHandler)

app.listen(port, ()=> console.log(`server running at port ${port}`))