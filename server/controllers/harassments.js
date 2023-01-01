import harassment from "../models/harassment.js";
export const post_harassment=async(req,res)=>{
 

try {

    const harassmentPost=new harassment(req.body);
    await harassmentPost.save()
    res.status(200).send(harassmentPost)
} catch (error) {
    res.status(400).send(error.message)
}




}
export const get_all_harassments=async(req,res)=>{
   try {
    const all_harasments=await harassment.find();
    res.status(200).send(all_harasments)
   } catch (error) {
    res.status(400).send(error)
   }
   


}