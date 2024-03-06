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

        const otpValid= await bcrypt.compare(otp,tempUserData.otp);

        if(otpValid){
            const addUser=new user({
                name,gender,phone,email,aadhar,password
            })
            const dataRes=await addUser.save();
            if(!dataRes){
                throw new Error("Failed to add user to database")
            }
            res.status(200).json({success:"User Added"})
        }else{
            throw new Error("OTP verification Failed")
        }

    }catch(err){
        console.log(err)
        res.status(400).json({error:`${err}`})
    }
})

router.get("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;

        const findUser=await user.findOne({email});
        if(!findUser){
            throw new Error("wrong login credentials")
        }
        const verifyPass=await bcrypt.compare(password,findUser.password)
        if(!verifyPass){
            throw new Error("wrong login credentials")
        }

        res.status(200).json({id:`${findUser._id}`})

    }catch(error){
        res.status(400).json({error:`${error}`})
    }
})

router.post("/reportcomplain/:id",async(req,res)=>{
    try{
        const {subject,description,location,dname}=req.body;
        const userId=req.params.id;
        const dId= dname+location;
        const checkDepartment=await department.findOne({departmentId:dId});
        if(!checkDepartment){
            throw new Error("Department does not exist");
        }
        const dPid=checkDepartment._id;

        const complainDetails= new complain({
            userId,
            departmentId:dPid,
            status:false,
            subject,
            description,
            location,
            dname
        })
        const complainSave=await complainDetails.save();
        if(!complainSave){
            throw new Error("Failed to register complain")
        }
        res.status(200).json({success:"complain registered"})

    }catch(err){
        res.status(400).json({error:`${err}`})
    }
})

router.get("/viewcomplains/:id",async(req,res)=>{
    try{
        const userId=req.params.id;
        
        const getComplains=await complain.find({userId});
        if(getComplains.length===0){
            return res.status(400).json({data:[]})
        }
        
        const complainData = getComplains.map(complain => ({
            department: complain.dname,
            subject: complain.subject,
            description: complain.description,
            zipcode: complain.location,
            status: complain.status
        }));

        res.status(200).json({data:complainData})

    }catch(err){
        res.status(400).json({error:`${err}`})
    }
})

router.get("/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const getUser=await user.findOne({_id:id});
        if(!getUser){
            throw new Error("Error Fetching Profile")
        }
        const userData={
            name:getUser.name,
            gender:getUser.gender,
            email:getUser.email,
            phone:getUser.phone
        }

        res.status(200).json(userData)
        

    }catch(error){
        res.status(400).json({error:`${error}`})
    }
})



module.exports=router;