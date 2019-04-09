import express from 'express'; 
import { Router, json} from 'express';

import  Account  from '../controllers/accounts';


const accountRouter = express.Router(); 

accountRouter.use(json()); 


accountRouter.post('/api/v1/accounts', Account.createAccount);


export default accountRouter;