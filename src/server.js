const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const connectDB = require('./config/database')
const cors = require('cors')



const app = express();

connectDB()

app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json())

const PORT = process.env.PORT || 5000;

app.use('/api/items', require('./routes/userRoute'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

