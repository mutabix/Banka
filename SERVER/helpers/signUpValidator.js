import Joi from 'joi';


const signUpValidator = (user) => {
    const schema = {
        first_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        last_name: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().regex(/^\S+$/).email().required(),
        type: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        password: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 
        is_admin: Joi.boolean()

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



export default signUpValidator;