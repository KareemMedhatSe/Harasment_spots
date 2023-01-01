import mongoose from "mongoose";
import harassment from "./harassment.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv';
dotenv.config()
const user_schema=mongoose.Schema({
username:{type:String, required:true,unique:true,min:2,max:25},
password:{type:String,required:true,min:6},
email:{type:String,required:true,unique:true,validate(value){if(!validator.isEmail(value)){throw new Error('please enter a valid email');}}}




},{timestamps:true,toJSON: {virtuals: true}})

   
export default mongoose.model('user',user_schema)