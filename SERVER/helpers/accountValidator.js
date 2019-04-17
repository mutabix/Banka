import Joi from 'joi';


const accountValidator = (account) => {
    
    const schema = {
        create_on: Joi.date(),
        owner: Joi.number().integer().required(),
        type: Joi.string().regex(/^\S+$/).valid(['savings', 'current']).min(3).max(255).required(),
        status: Joi.string().regex(/^\S+$/).min(3).max(255).required(), 
        initial_balance: Joi.number().required(),

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

    return Joi.validate(account, schema, options);
};



export default accountValidator;