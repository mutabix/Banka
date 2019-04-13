import Joi from 'joi';
import bcrypt from 'bcryptjs';

const loginFields = (findUser) => {
    const schema = {
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

    return Joi.validate(findUser, schema, options);
}

const comparePassword = (encrypted_password, password) => {
    const compared_password = bcrypt.compare(password, encrypted_password);
    return compared_password;
};

export { loginFields, comparePassword};