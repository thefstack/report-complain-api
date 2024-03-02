const mongoose=require("mongoose");


const departSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:Number,
        unique:true,
        required:true
    }
})

const department=new mongoose.model("department",departSchema);

module.exports=department;