import Joi from 'joi';


const accountValidator = (newAccount) => {
    const schema = {
        account_number: Joi.number().integer().required(),
        create_on: Joi.date(),
        owner: Joi.number().integer().required(),
        type: Joi.string().regex(/^\S+$/).min(3).max(20).required(),
        status: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 
        balance: Joi.number().required()

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

    return Joi.validate(newAccount, schema, options);
};



export default accountValidator;