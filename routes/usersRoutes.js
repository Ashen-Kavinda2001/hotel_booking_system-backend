import express from 'express';

const userRouter = express.Router();
import { getUser, postUser,loginUser,  } from '../controllers/userController.js';
 
userRouter.get('/',getUser)

userRouter.post('/',postUser)

userRouter.post('/login',loginUser)

export default userRouter;