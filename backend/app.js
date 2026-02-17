import express from 'express';
import errorMiddleware from './middleware/error.middleware.js';
import authRouter from "./routers/auth.router.js"; 
import adminRouter from "./routers/admin.router.js"; 
import taskRouter from "./routers/task.router.js"; 
import AIrouter from "./routers/ai.router.js"

const app = express(); 

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("hello"); 
})

app.use('/auth',authRouter); 
app.use('/admin',adminRouter); 
app.use('/tasks',taskRouter); 
app.use('/ai',AIrouter); 



app.use(errorMiddleware);
export default app; 