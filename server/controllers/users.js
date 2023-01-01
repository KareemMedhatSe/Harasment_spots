import user from '../models/user.js'
import bcrypt from'bcrypt'
export const signup=async(req,res)=>{
    try {
        const salt=await bcrypt.genSalt(10)
        const hashed_password=await bcrypt.hash(req.body.password,salt)
        
        const new_user=new user({email:req.body.email,password:hashed_password,username:req.body.username})
        await new_user.save()
        res.status(200).send(new_user)
    } catch (error) {
        res.status(400).send(error)
    }



}
export const signin=async (req,res)=>{
    const {username,password}=req.body
   
    try {
        const curr_user=await user.findOne({username})
        const pass=await bcrypt.compare(password,curr_user.password)
        if(!pass){throw new Error('wrong credentials')}
        
       
    if(!curr_user){ throw new Error('no such user with this username')}
        res.status(200).json({ _id: curr_user._id, username: curr_user.username });

    } catch (error) {
        res.status(400).send(error.message)
        
    }



}