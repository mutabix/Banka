import express from 'express';
import {
    Router,
    json
} from 'express';
import User from '../../controllers/auth/userAuth';
import Admin from '../../controllers/auth/adminAuth';

const {
    adminRegister,
    adminLogin
} = Admin;

const {
    userSignUp,
    userLogIn
} = User;

const userRouter = express.Router();

userRouter.use(json());

userRouter.post('/auth/admin/signup', adminRegister);
userRouter.post('/auth/admin/login', adminLogin);
userRouter.post('/auth/signup', userSignUp);
userRouter.post('/auth/login', userLogIn);


export default userRouter;