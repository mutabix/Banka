import transactions from '../models/transaction';
import debitValidator from '../helpers/debitValidator';
import creditValidator from '../helpers/creditValidator';
import accounts from '../models/account';
import moment from 'moment';


class Transaction {

    static debitAccount(req, res) {

        const {
            error
        } = debitValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        let m = moment();
        const created_on = m.format('dddd, MMMM Do YYYY, h:mm a');

        const {
            amount,
            old_balance,
            transaction_type,
            cashier
        } = req.body;

        let x, y, sum;
        x = amount
        y = old_balance;
        sum = parseFloat(x) + parseFloat(y);


        const newDebit = {
            created_on: created_on,
            transaction_id: transactions.length + 1,
            account_number: 2,
            cashier: parseInt(cashier),
            transaction_type: transaction_type,
            old_balance: parseFloat(old_balance),
            amount: parseFloat(amount),
            new_balance: sum
        }

        console.log('New Debit', newDebit);
        transactions.push(newDebit);
        res.status(201).send({
            status: 201,
            message: 'Amount successfully debited!',
            data: newDebit
        })
    }


    static creditAccount(req, res) {
        const {
            error
        } = creditValidator(req.body);

        if (error) return res.send({
            status: 404,
            error: error.details[0].message
        });

        let m = moment();
        const created_on = m.format('dddd, MMMM Do YYYY, h:mm a');

        const {
            amount,
            old_balance,
            transaction_type,
            cashier
        } = req.body;

        let x, y, balance;
        x = amount
        y = old_balance;
        balance = parseFloat(x) - parseFloat(y);


        if (y == 0 || y < amount ) {

            return res.status(400).send({
                status: 400,
                error: 'You have insufficent balance!'
            })

        } else {

            const newCredit = {
                created_on: created_on,
                transaction_id: transactions.length + 1,
                account_number: 2,
                cashier: parseInt(cashier),
                transaction_type: transaction_type,
                old_balance: parseFloat(old_balance),
                amount: parseFloat(amount),
                new_balance: balance
            }

            console.log('New Credit', newCredit);
            transactions.push(newCredit);
            res.status(201).send({
                status: 201,
                message: 'Amount successfully credited!',
                data: newCredit
            })


        }

    }
}


export default Transaction;
