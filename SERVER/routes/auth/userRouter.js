import express from 'express'; 
import { Router, json} from 'express';
import  User  from '../../controllers/auth/userAuth';

const {userSignUp, userLogIn} = User;

const userRouter = express.Router(); 

userRouter.use(json()); 


userRouter.post('/auth/signup', userSignUp);
userRouter.post('/auth/login', userLogIn);



export default userRouter;