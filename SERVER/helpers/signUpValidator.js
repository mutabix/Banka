import Joi from 'joi';


const signUpValidator = (user) => {
    const schema = {
        firstName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        lastName: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        email: Joi.string().regex(/^\S+$/).email().required(),
        type: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        passWord: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 
        isAdmin: Joi.boolean().invalid(false)

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