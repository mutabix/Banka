import users from '../../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
import signUpValidator from '../../helpers/signUpValidator';
import userRouter from '../../routes/auth/userRouter';




class User {
    static userSignUp(req, res, next) {

        bcrypt.hash(req.body.password, 8)
            .then((hashedPassword) => {

                const user = {
                    id: users.length + 1,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
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


                users.push(user);
                res.status(201).send({
                    status: 201,
                    userToken: token,
                    data: user
                });
            }).catch(error => (res.send(error)));

    }

    static userLogIn(req, res, next) {
        const email = req.body.email;
        const password = req.body.password;

        const findUser = users.find(us => us.email == email); 

            if (!findUser) return res.status(404).send('User not found!');

            bcrypt.compare(password, findUser.password)
                .then((result) => {
                    if (!result) return res.status(401).send('Password not valid!');

                    const accessToken = jwt.sign({
                        id: findUser.id,
                        email: findUser.email
                    }, config.secretKey, {
                        expiresIn: 3600
                    });
                    res.status(200).send({
                        status: 200,
                        usesToken: accessToken,
                        data: findUser
                    });
                }).catch(error => console.log(error));
    }
}


export default User;