const express = require("express");
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();
const connectDB=require("./config/database");
const todoroutes=require("./routes/todoroutes");
const PORT=process.env.PORT||5000;
const dotenv=require("dotenv");
dotenv.config({path:'./config/.env'});


connectDB();
app.use(bodyParser.json())
app.use(cors());
app.use('/api/todos',todoroutes);
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
module.exports=app;