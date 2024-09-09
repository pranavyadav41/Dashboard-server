const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/database')
const cors = require('cors')
const morgan =require('morgan')
const { errorHandler } = require('./middlewares/errorHandle');

const app = express();

connectDB()

app.use(cors({
    origin: process.env.CORS,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json())

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'))

app.use('/api/employee', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

