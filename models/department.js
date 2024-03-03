const mongoose=require("mongoose");


const departSchema=new mongoose.Schema({
    departmentId:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String
    },
    location:{
        type:Number,
        required:true
    }
})

const department=new mongoose.model("department",departSchema);

module.exports=department;