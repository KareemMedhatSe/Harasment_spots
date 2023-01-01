
import mongoose from "mongoose";
import user from "./user.js";
const harassment_location_schema=mongoose.Schema({
Title:{type:String, unique:true,required:true,min:3,max:30},
description:{type:String,required:true,min:5},
long:{type:Number,required:true},
lat:{type:Number,required:true},
author:String,
image:{type:String}
},{timestamps:true})

export default mongoose.model('harassment',harassment_location_schema)