const mongoose=require("mongoose");
const bcrypt=require('bcryptjs')


const tempUserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

tempUserSchema.pre("save",async function(next){
if(this.isModified("otp")){
        this.otp= await bcrypt.hash(this.otp,10);
    }
    next();
})

const tempuser=new mongoose.model('tempuser',tempUserSchema);

module.exports=tempuser;