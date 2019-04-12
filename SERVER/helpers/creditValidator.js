import Joi from 'joi';


const creditValidator = (newCredit) => {
    const schema = {

        old_balance: Joi.number().required(),
        amount: Joi.number().required(),
        cashier: Joi.number().integer().required(),
        transaction_type: Joi.string().regex(/^\S+$/).min(3).max(50).required(),

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