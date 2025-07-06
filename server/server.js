require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // allow your frontend
  credentials: true                // if you use cookies or auth
}));

 const connectDB = require('./config/db');
 const taskRoutes = require('./routes/taskRoutes');
 connectDB();
   app.use(express.json());
   
   app.use('/api/tasks', taskRoutes);

 app.listen(5000, () => {
    console.log('Server is running on port 5000');
 });