const mongoose=require("mongoose");
const bcrypt=require("bcryptjs")

const departmentuserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    departmentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "department",
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    }
})


departmentuserSchema.pre("save",async function(next){
    if(this.isModified("password")){
            this.password= await bcrypt.hash(this.password,10);
        }
        next();
})


const departmentuser= new mongoose.model("departmentuser",departmentuserSchema);

module.exports=departmentuser;