import express from 'express'; 
import { Router, json} from 'express';
import  Account  from '../controllers/accounts';

const {createAccount, updateAccount, deleteAccount} = Account;


const accountRouter = express.Router(); 

accountRouter.use(json()); 


accountRouter.post('/api/v1/accounts', createAccount);
accountRouter.patch('/api/v1/accounts/:account_number', updateAccount);
accountRouter.delete('/api/v1/accounts/:account_number', deleteAccount);


export default accountRouter;