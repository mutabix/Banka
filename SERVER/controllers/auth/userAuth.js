import lodash from 'lodash';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import users from '../../models/user';
import config from '../../config/config';
import signUpValidator from '../../helpers/signUpValidator';




class User {
    static userSignUp(req, res) {

        const {
            error
        } = signUpValidator(req.body);

        if(error) return res.send({
            status: 404,
            error: error.details[0].message
        })

        bcrypt.hash(req.body.password, 8)
            .then((hashedPassword) => {

                const user = {
                    id: users.length + 1,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashedPassword,
                    type: req.body.type,
                    is_admin: req.body.is_admin
                }

                const token = jwt.sign({
                    id: user.id,
                    email: user.email
                }, config.secretKey, {
                    expiresIn: 3600
                });

                console.log(user);
                users.push(user);
                res.status(201).send({
                    status: 201,
                    userToken: token,
                    data: lodash.pick(user, ['id', 'first_name', 'last_name', 'email', 'type', 'is_admin'])
                });
            }).catch(error => (res.send(error)));

    }

    static userLogIn(req, res) {

        const email = req.body.email;
        const password = req.body.password;

        const findUser = users.find(us => us.email == email); 

            if (!findUser) return res.status(404).send({
                status: 404,
                error: 'User Not Found!'
            });

            bcrypt.compare(password, findUser.password)
                .then((result) => {
                    if (!result) return res.status(401).send({
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
                        usesToken: accessToken,
                        data: lodash.pick(findUser, ['id', 'email'])
                    });
                }).catch(error => (res.send(error)));
    }
}


export default User;