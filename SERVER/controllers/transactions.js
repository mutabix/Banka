import transactions from '../models/transaction';
import debitValidator from '../helpers/debitValidator';
import creditValidator from '../helpers/creditValidator';
import accounts from '../models/account';

import moment from 'moment';


const Transaction = {

    async creditAccount(req, res) {

        const {
            error
        } = debitValidator(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        let m = moment();
        const created_on = m.format('dddd, MMMM Do YYYY, h:mm a');

        const foundAcc = accounts.find(ac => ac.account_number === parseInt(req.params.account_number));

        const {
            amount,
            transaction_type,
            cashier
        } = req.body;

        const sum = parseFloat(amount) + foundAcc.initial_balance;

        try {

            const newDebit = {
                created_on: created_on,
                transaction_id: transactions.length + 1,
                account_number: foundAcc.account_number,
                cashier: parseInt(cashier),
                transaction_type: transaction_type,
                amount: parseFloat(amount),
                initial_balance: parseFloat(foundAcc.initial_balance),
                new_balance: sum
            }

            transactions.push(newDebit);
            return res.status(201).json({
                status: 201,
                message: 'Account successfully credited!',
                data: newDebit
            })

        } catch (eror) {
            return res.status(400).json({
                status: 400,
                error: error
            })
        }

    },


    async debitAccount(req, res) {
        const {
            error
        } = creditValidator(req.body);

        if (error) return res.status(400).json({
            status: 400,
            error: error.details[0].message
        });

        let m = moment();
        const created_on = m.format('dddd, MMMM Do YYYY, h:mm a');

        const foundAcc = accounts.find(ac => ac.account_number === parseInt(req.params.account_number));

        const {
            amount,
            transaction_type,
            cashier
        } = req.body;

        const balance = foundAcc.initial_balance - parseFloat(amount);

        if (foundAcc.initial_balance == 0 || foundAcc.initial_balance < parseFloat(amount)) return res.status(400).json({
            status: 400,
            error: 'You have insufficient balance!'
        })

        try {

            const newCredit = {
                created_on: created_on,
                transaction_id: transactions.length + 1,
                account_number: foundAcc.account_number,
                cashier: parseInt(cashier),
                transaction_type: transaction_type,
                initial_balance: parseFloat(foundAcc.initial_balance),
                amount: parseFloat(amount),
                new_balance: balance
            }

            transactions.push(newCredit);
            return res.status(201).json({
                status: 201,
                message: 'Account successfully debited!',
                data: newCredit
            })

        } catch (error) {
            return res.status(400).json({
                status: 400,
                error: error
            })
        }
    }
}


export default Transaction;
