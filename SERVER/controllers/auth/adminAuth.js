import lodash from 'lodash';
import jwt from 'jsonwebtoken';
import users from '../../models/user';
import config from '../../config/config';
import {encryptPassword, signUpFields } from '../../helpers/signUpValidator'; 
import {comparePassword, loginFields} from '../../helpers/logInValidator'; 

const Admin = {

    async adminRegister(req, res){

        const encrypted_password = await encryptPassword(req.body.password);
        
        const admin = {
            id: users.length + 1,
            first_name: 'moise',
            last_name: 'rwibutso',
            email: req.body.email,
            password: encrypted_password,
            type: 'staff',
            is_admin: true
        }
    
        try{
            const token = jwt.sign({
                id: admin.id,
                email: admin.email
            }, config.secretKey, {
                expiresIn: 3600
            });
    
            users.push(admin);
            return res.status(201).json({
                status: 201,
                message: 'Admin Successfully Signed Up!',
                userToken: token,
                data: lodash.pick(admin, ['id', 'first_name', 'last_name', 'email', 'type', 'is_admin'])
            });
        }catch(error){
            return res.status(400).json({
                status: 400,
                error: error
            })
        }
    
    }, 

    async adminLogin(req, res){

        const { email, password } = req.body;

        const  findAdmin =  await users.find( ad => ad.email == email); 

            if (!findAdmin) return res.status(404).json({
                status: 404,
                error: 'Admin Not Found!'
            });

        const compared_password =  await comparePassword(findAdmin.password, password);

        try{

            if(!compared_password) return res.status(401).json({
                status: 401, 
                error: 'Invalid Password!'
            });

            const accessToken = jwt.sign({
                id: findAdmin.id,
                email: findAdmin.email
            }, config.secretKey, {
                expiresIn: 3600
            });

            return res.status(200).json({
                status: 200,
                message: 'Successfully Logged In',
                userToken: accessToken,
                data: lodash.pick(findAdmin, ['id', 'email'])
            });

        } catch(error){
            return res.status(404).json({
                status: 404, 
                error: error 
            })
        }
        
    }

}


export default Admin;