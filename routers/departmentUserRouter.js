const express=require("express");
const bcrypt=require("bcryptjs");


const router=express.Router();
const user=require("../models/user");
const department=require("../models/department");
const complain=require("../models/complain");
const departmentuser=require("../models/departmentuser");

router.post("/signup",async(req,res)=>{
    try{
        const duserData= new departmentuser({
            name:"Harish",
            departmentId:"65e408e1092683aea4406320",
            username:"user1",
            password:"12345"
        })
        console.log("working")
        const duserRes=await duserData.save();
        if(!duserRes){
            throw new Error("failed to add ne user")
        }
        console.log("user added")
        res.status(200).json({success:"addes"})
    }catch(error){
        console.log(error)
        res.status(200).json({error:`${error}`})
    }
})
router.get("/login",async(req,res)=>{
    try{
        const {username,password}=req.body;
        const findUser=await departmentuser.findOne({username});
        if(!findUser){
            throw new Error("Login Failed")
        }
        const isPass= await bcrypt.compare(password,findUser.password);
        if(!isPass){
            throw new Error("Login Failed")
        }
        res.status(200).json({success:"Login success"});
    }catch(error){
        res.status(400).json({error:`${error}`})
    }
})


module.exports=router;