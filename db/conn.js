const mongoose=require("mongoose");

mongoose.connect(`mongodb://localhost:27017/report-complain`).then(()=>{
    console.log("connected to Database")
}).catch((err)=>{
    console.log("Failed to connect to Database")
})