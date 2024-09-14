import express from 'express';
import { userRouter , zapRouter , triggerRouter , actionRouter } from './routes';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/v1/user' , userRouter);
app.use('/api/v1/zap' , zapRouter);
app.use("/api/v1/trigger" , triggerRouter);
app.use("/api/v1/action", actionRouter);


app.listen(8080 ,()=>{
    console.log('server is running on port 8080');
})