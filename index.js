import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/usersRoutes.js';
import mongoose from 'mongoose';
import galleryItemRoute from './routes/GalleryItemRoute.js';
import categeoryRouter from './routes/categeoryRouts.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express();
app.use(bodyParser.json());

const connectionString = process.env.Mongo_Url;
mongoose.connect(connectionString).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.log('Connection failed:', error);
});

app.use((req, res, next) => {

  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (token != null) {
  jwt.verify(token, process.env.Jwt_Key, (err, decoded) => {
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

app.use('/api/users', userRouter);
app.use('/api/gallery', galleryItemRoute);  
app.use('/api/categories', categeoryRouter);



app.listen(3001, (req,res) => {
  console.log('Server is running on port 3001');
});

