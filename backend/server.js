import app from "./app.js"
import "dotenv/config"
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000 ; 

connectDB(); 


console.log("PORT from env:", process.env.PORT);

app.listen(PORT, ()=>{
    console.log("the server is running successfully!"); 
})

