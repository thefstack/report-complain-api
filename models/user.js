const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true

    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    aadhar:{
        type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})


userSchema.pre("save",async function(next){
    if(this.isModified("password")){
            this.password= await bcrypt.hash(this.password,10);
        }
        next();
    })



const user=new mongoose.model('user',userSchema);

module.exports=user;