import Joi from 'joi';


const creditValidator = (newCredit) => {
    const schema = {

        old_balance: Joi.number(),
        amount: Joi.number(),
        cashier: Joi.number().integer(),
        transaction_type: Joi.string().regex(/^\S+$/).min(3).max(50),

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

    return Joi.validate(newCredit, schema, options);
};



export default creditValidator;