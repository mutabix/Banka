import express from 'express';
import {
    Router,
    json
} from 'express';

import Transaction from '../controllers/transactions';

const {
    debitAccount,
    creditAccount
} = Transaction;


const transactionRouter = express.Router();

transactionRouter.use(json());


transactionRouter.post('/api/v1/transactions/:account_number/credit', creditAccount);
transactionRouter.post('/api/v1/transactions/:account_number/debit', debitAccount);



export default transactionRouter;