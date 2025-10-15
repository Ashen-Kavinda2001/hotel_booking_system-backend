import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/usersRoutes.js';
import mongoose from 'mongoose';
import galleryItemRoute from './routes/GalleryItemRoute.js';
import jwt from 'jsonwebtoken';

const app = express();
app.use(bodyParser.json());

const connectionString = 'mongodb+srv://Ashen:123@cluster0.4q07s2y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Here you would typically connect to the database using the connection string
// e.g., mongoose.connect(connectionString);

app.use((req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token != null) {
  jwt.verify(token, 'yourSecretKey', (err, decoded) => {
    if (decoded != null) {
      req.body.user = decoded;
      next();
    } else {
      res.status(401).json({ error: 'Invalid token' });
    }
  })

  }else {
  next();
 }
});


  mongoose.connect(connectionString).then(() => {
    console.log('Connected to MongoDB');
  }).catch(() => {
    console.log('Connection failed');
  })
app.use('/api/users', userRouter);
app.use('/api/gallery', galleryItemRoute);  

app.listen(3000, (req,res) => {
  console.log('Server is running on port 3000');
});

