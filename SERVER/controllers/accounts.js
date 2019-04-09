import accounts from '../models/account'; 
import accountValidator from '../helpers/accountValidator';
import moment from 'moment';


class Account{

    static createAccount(req, res){

        const {
            error
        } = accountValidator(req.body);

        if(error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        let m = moment(); 
        let real_date = m.format('dddd, MMMM Do YYYY, h:mm a');

        const newAccount = {
            id: accounts.length + 1, 
            account_number: req.body.account_number, 
            created_on: real_date,
            owner: req.body.owner, 
            type: req.body.type, 
            status: req.body.status, 
            balance: req.body.balance

        }

        accounts.push(newAccount); 
        res.status(201).send({
            status: 201, 
            data: newAccount
        })

    }
}

export default Account;