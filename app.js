const express = require ('express')
const app = express()

app.use(express.urlencoded({extended:true}));
app.use(express.json())

const dotenv = require ('dotenv')
dotenv.config()

const jwt = require ('jsonwebtoken')

const router = require ('./router')

const request = require('request')

const optionsConnection = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };

const mongoose = require ('mongoose')
mongoose.connect(process.env.DB_CONNECT,optionsConnection)
.then(()=>{console.log('connected to DB')})
.catch(error=>{console.log(error)})

app.use(router)
app.listen(process.env.PORT,()=>console.log(`listenning to port ${process.env.PORT}`))

