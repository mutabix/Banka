import express from 'express'; 
import { Router, json} from 'express';

import  Transaction  from '../controllers/transactions';


const transactionRouter = express.Router(); 

transactionRouter.use(json()); 


transactionRouter.post('/api/v1/transactions/:account_number/debit', Transaction.debitAccount);

transactionRouter.post('/api/v1/transactions/:account_number/credit', Transaction.creditAccount);



export default transactionRouter;