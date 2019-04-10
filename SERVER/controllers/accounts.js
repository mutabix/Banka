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
 
            created_on: real_date,
            account_number: accounts.length + 1, 
            owner: req.body.owner, 
            type: req.body.type, 
            status: req.body.status, 
            balance: parseFloat(req.body.balance)

        }

        accounts.push(newAccount); 
        res.status(201).send({
            status: 201, 
            data: newAccount
        })

    }



    static updateAccount(req, res){

        const foundAcc = accounts.find(ac => ac.account_number === parseInt(req.params.account_number)); 

        let m = moment();
        let modified_on = m.format('dddd, MMMM Do YYYY, h:mm a');

        console.log(foundAcc);

        if(!foundAcc)return res.status(404).send({
            status: 404, 
            error: 'Account number not found!'
        }); 

        foundAcc.owner =  req.body.owner;
        foundAcc.type =   req.body.type;
        foundAcc.status = req.body.status;
        foundAcc.balance = req.body.balance;
        foundAcc.modified_on =  modified_on;
    
        res.status(200).send({
            status: 200, 
            message: 'Account Updated!', 
            data: foundAcc
        }) 
    }


    static deleteAccount(req, res){
        
        const foundAcc = accounts.find(ac => ac.account_number === parseInt(req.params.account_number)); 

        if(!foundAcc)return res.status(404).send({
            status: 404, 
            error: 'Account number not found!'
        }); 

        const index = accounts.indexOf(foundAcc);
        accounts.splice(index, 1);
        res.status(200).send({
            status: 200, 
            message: 'Account Deleted!', 
            data: foundAcc
        })
       
    }

}

export default Account;