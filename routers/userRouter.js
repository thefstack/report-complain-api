const express=require("express")
const bcrypt=require("bcryptjs")
const sendOTPVerificationEmail=require("../helpers/mailOTP")
const user=require("../models/user.js");
const tempuser=require("../models/tempuser.js");
const complain=require("../models/complain.js");
const department=require("../models/department.js")
const router=express.Router();


router.post("/sendotp",async(req,res)=>{
    try{
        const {phone,email,aadhar}=req.body;
        
        const user=require("../models/user.js")
        const tempuser=require("../models/tempuser")

        const checkEmail=await user.findOne({email});
        const checkPhone=await user.findOne({phone});
        const checkAadhar=await user.findOne({aadhar});
        if(checkEmail || checkPhone || checkAadhar){
            throw new Error("Either email,phone or aadhar already linked to other account");
        }
        const checkTempUser=await tempuser.findOne({email})
        if(checkTempUser){
            const otpResponse=await sendOTPVerificationEmail(email);
        if(otpResponse==-1){
            throw new Error("Failed to send Otp")
        }
            checkTempUser.otp=otpResponse;
            await checkTempUser.save()
        }else{
            const otpResponse=await sendOTPVerificationEmail(email);
        if(otpResponse==-1){
            throw new Error("Failed to send Otp")
        }
        
        const addtempuser=new tempuser({
            email,
            otp:otpResponse
        })

        const addTempUser=await addtempuser.save();
        if(!addTempUser){
            throw new Error("Failed to Send Otp")
        }
        }

        res.status(200).json({success:"Otp Sent"})
    }catch(err){
        console.log(err)
        res.status(400).json({error:`${err}`})
    }
})

router.post("/signup",async(req,res)=>{
    try{
        const {name,gender,phone,email,password,aadhar,otp}=req.body;
        
        
        const tempUserData=await tempuser.findOne({email})
        if(!tempUserData){
            throw new Error("Verification failed")
        }
        console.log(otp)
        const otpValid= await bcrypt.compare(otp,tempUserData.otp);
        console.log(otpValid)
        if(otpValid){
            const addUser=new user({
                name,gender,phone,email,aadhar,password
            })
            console.log("OTP verification Success")
            const dataRes=await addUser.save();
            if(!dataRes){
                throw new Error("Failed to add user to database")
            }
            res.status(200).json({success:"User Added"})
        }else{
            throw new Error("OTP verification Failed")
        }

    }catch(err){
        res.status(400).json({error:`${err}`})
    }
})

router.post("/reportcomplain/:userId",(req,res)=>{
    try{
        const {subject,description,location,department}=req.body;
        const userID=req.params.userId;

    }catch(error){
        res.status(400).json({error:`${err}`})
    }
})



module.exports=router;