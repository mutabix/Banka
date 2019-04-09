
import express from 'express'; 
import userRouter from './routes/auth/userRouter';


const app = express(); 
app.use(express.urlencoded({extended: false}));
app.use(express.json()); 

app.use(userRouter);


app.get('/', (req, res) =>{
    res.status(200).json({
        message: 'Welcome to Banka'
    });
});

app.use('*', (req, res) =>{
    res.status(404).send({
        status: 404,
        message: 'Wrong Url or HTTP Request!'
    });
});


const port = process.env.PORT || 3000; 
app.listen(port);

export default app;