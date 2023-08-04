const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan')
const bodyparser=require('body-parser');
const path = require('path');
const cors = require("cors");

const app=express();
const connectDB=require('./server/database/connection')

dotenv.config({path:'config.env'});

const PORT=process.env.PORT||8080
//log requestnpm
app.use(morgan('tiny'));

//mongoDB connection

connectDB();

//parse request to body parser

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//set view engine

app.set("view engine","ejs")

//load assests

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


//load router

app.use('/', require('./server/routes/router.js'))



app.listen(PORT,()=>{
    console.log(`server is running on http://localhost${PORT}`)
})