import Joi from 'joi';


const debitValidator = (newDebit) => {
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

    return Joi.validate(newDebit, schema, options);
};



export default debitValidator;