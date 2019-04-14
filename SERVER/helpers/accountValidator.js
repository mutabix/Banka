import Joi from 'joi';


const accountValidator = (account) => {
    const schema = {
        create_on: Joi.date(),
        owner: Joi.number().integer(),
        type: Joi.string().regex(/^\S+$/).valid(['savings', 'current']).min(3).max(255),
        status: Joi.string().regex(/^\S+$/).min(3).max(255), 
        balance: Joi.number().integer(),

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