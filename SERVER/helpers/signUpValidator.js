import Joi from 'joi';
import bcrypt from 'bcryptjs'

const signUpFields = (user) => {
    const schema = {
        first_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        last_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().regex(/^\S+$/).email().required(),
        password: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 

    };

    const options = {
        language: {
            key: '{{key}} ',
            string: {
                regex: {
                    base: 'must not have empty spaces'
                }
            }
        }
    }

    return Joi.validate(user, schema, options);
};

const encryptPassword = (password) => {
    const encrypted_password = bcrypt.hash(password, 10);
    return encrypted_password;
};


export {signUpFields, encryptPassword};