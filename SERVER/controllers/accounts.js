import moment from 'moment';
import accounts from '../models/account';
import accountValidator from '../helpers/accountValidator';

const Account = {

    async createAccount(req, res) {

        const {
            error
        } = accountValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        let m = moment();
        let real_date = m.format('dddd, MMMM Do YYYY, h:mm a');

        try {

            const account = {
                created_on: real_date,
                account_number: accounts.length + 1,
                owner: req.body.owner,
                type: req.body.type,
                status: req.body.status,
                balance: parseFloat(req.body.balance)
            }

            accounts.push(account);
            res.status(201).send({
                status: 201,
                data: account
            })


        } catch (error) {
            res.status(404).send({
                status: 404,
                error: error
            })
        }
    },

    async updateAccount(req, res) {

        const foundAcc = accounts.find(ac => ac.account_number === parseInt(req.params.account_number));
        let m = moment();
        let modified_on = m.format('dddd, MMMM Do YYYY, h:mm a');

        if (!foundAcc) return res.status(404).send({
            status: 404,
            error: 'Account number not found!'
        });

        try {

            foundAcc.owner = req.body.owner;
            foundAcc.type = req.body.type;
            foundAcc.status = req.body.status;
            foundAcc.balance = req.body.balance;
            foundAcc.modified_on = modified_on;

            res.status(200).send({
                status: 200,
                message: `Account number ${foundAcc.account_number} sucessfully updated!`,
                data: foundAcc
            })

        } catch (error) {
            res.status(400).send({
                status: 400,
                error: error
            })
        }
    },
    
    async deleteAccount(req, res) {

        const foundAcc = accounts.find(ac => ac.account_number === parseInt(req.params.account_number));
        if (!foundAcc) return res.status(404).send({
            status: 404,
            error: 'Account number not found!'
        });

        try {

            const index = accounts.indexOf(foundAcc);
            accounts.splice(index, 1);
            res.status(200).send({
                status: 200,
                message: `Account number ${foundAcc.account_number} sucessfully deleted!`,
                data: accounts
            })
        } catch (error) {
            return res.status(400).send({
                status: 400,
                error: error
            })
        }
    }

}

export default Account;