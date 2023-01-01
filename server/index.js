import express from 'express'
import mongoose from 'mongoose'
import dotenv from'dotenv'
import harassment_router from './routes/harassment.js'
import bodyParser from "body-parser"
import user_router from './routes/user.js'
dotenv.config()
const app=express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use('/api/harassment',harassment_router)
app.use('/api/user',user_router)
const port=process.env.PORT||3000
mongoose.connect(process.env.CONNECTION_URL
    ,{useNewUrlParser:true}).then(()=>app.listen(port,()=>console.log(`connected to ${port}`))).catch((error)=>console.log(error.message))