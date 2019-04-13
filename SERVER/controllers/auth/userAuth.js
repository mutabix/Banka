import lodash from 'lodash';
import bcrypt from 'bcryptjs';
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

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        const encrypted_password = await encryptPassword(req.body.password);

        const user = {
            id: users.length + 1,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: encrypted_password,
            type: req.body.type,
            is_admin: req.body.is_admin
        }

        try {
            const token = jwt.sign({
                id: user.id,
                email: user.email
            }, config.secretKey, {
                expiresIn: 3600
            });

            users.push(user);
            res.status(201).send({
                status: 201,
                message: 'Successfully Signed Up!',
                userToken: token,
                data: lodash.pick(user, ['id', 'first_name', 'last_name', 'email', 'type', 'is_admin'])
            });

        } catch (error) {
            return res.status(400).send({
                status: 400,
                error: error
            })
        }

    },

    async userLogIn(req, res) {
        
        const {
            error
        } = loginFields(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        const { email, password } = req.body;

        const  findUser =  await users.find( us => us.email == email); 

            if (!findUser) return res.status(404).send({
                status: 404,
                error: 'User Not Found!'
            });

        const compared_password =  await comparePassword(findUser.password, password);

        try{

            if(!compared_password) return res.status(401).send({
                status: 401, 
                error: 'Invalid Password!'
            });

            const accessToken = jwt.sign({
                id: findUser.id,
                email: findUser.email
            }, config.secretKey, {
                expiresIn: 3600
            });

            res.status(200).send({
                status: 200,
                message: 'Successfully Logged In',
                usesToken: accessToken,
                data: lodash.pick(findUser, ['id', 'email'])
            });

        } catch(error){
            return res.status(404).send({
                status: 404, 
                error: error 
            })
        }
                    
    }
}


export default User;