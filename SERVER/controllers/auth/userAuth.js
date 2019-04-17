import lodash from 'lodash';
import jwt from 'jsonwebtoken';
import users from '../../models/user';
import config from '../../config/config';
import {
    signUpFields,
    encryptPassword
} from '../../helpers/signUpValidator';

import { loginFields, comparePassword } from '../../helpers/logInValidator';



const User = {

    async userSignUp(req, res) {

        const {
            error
        } = signUpFields(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        const encrypted_password = await encryptPassword(req.body.password);

        const user = {
            id: users.length + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: encrypted_password,
            is_admin: false
        }

        try {
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, config.secretKey, {
                expiresIn: 3600
            });

            users.push(user);
            return res.status(201).json({
                status: 201,
                message: 'Successfully Signed Up!',
                userToken: token,
                data: lodash.pick(user, ['id', 'first_name', 'last_name', 'email', 'type', 'is_admin'])
            });

        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: error
            })
        }

    },

    async userLogIn(req, res) {
        
        const {
            error
        } = loginFields(req.body);

        if (error) return res.json({
            status: 404,
            error: error.details[0].message
        });

        const { email, password } = req.body;

        const  findUser =  await users.find( us => us.email == email); 

            if (!findUser) return res.status(404).json({
                status: 404,
                error: 'User Not Found!'
            });

        const compared_password =  await comparePassword(findUser.password, password);

        try{

            if(!compared_password) return res.status(401).json({
                status: 401, 
                error: 'Invalid Password!'
            });

            const accessToken = jwt.sign({
                id: findUser.id,
                email: findUser.email
            }, config.secretKey, {
                expiresIn: 3600
            });

            return res.status(200).json({
                status: 200,
                message: 'Successfully Logged In',
                userToken: accessToken,
                data: lodash.pick(findUser, ['id', 'email'])
            });

        } catch(error){
            return res.status(404).json({
                status: 404, 
                error: error 
            })
        }
                    
    }
}


export default User;