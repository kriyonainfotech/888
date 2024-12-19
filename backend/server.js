const express = require('express')
const { ConnectDb } = require('./config/db')
const app = express()
const port = 3000
const dotenv = require('dotenv')
const cookieparser = require('cookie-parser')
const cors = require('cors')
ConnectDb()
dotenv.config()
app.use(cookieparser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',require('./routes/indexRoutes'))
app.listen(port,(err)=>{
    if(err) console.log(err)
    console.log(`Server Running On The Port = ${port}`);
})