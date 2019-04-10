import express from 'express'; 
import { Router, json} from 'express';

import  Account  from '../controllers/accounts';


const accountRouter = express.Router(); 

accountRouter.use(json()); 


accountRouter.post('/api/v1/accounts', Account.createAccount);
accountRouter.put('/api/v1/accounts/:account_number', Account.updateAccount);
accountRouter.delete('/api/v1/accounts/:account_number', Account.deleteAccount);


export default accountRouter;