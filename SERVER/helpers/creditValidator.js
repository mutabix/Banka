import Joi from 'joi';


const creditValidator = (newCredit) => {
    const schema = {

        old_balance: Joi.number().required(),
        account_number: Joi.number().integer().required(),
        amount: Joi.number().required(),
        cashier: Joi.number().integer().required(),
        transaction_type: Joi.string().regex(/^\S+$/).min(3).max(50).required(),
        new_balance: Joi.number().required(),


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