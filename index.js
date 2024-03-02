const express=require("express");
const app=express();


const PORT=process.env.PORT || 5000;

require("./db/conn.js")

const userRouter=require("./routers/userRouter.js")

app.use(express.json())
app.use("/user",userRouter)



app.listen(PORT,()=>{
    console.log(`Listening to PORT : ${PORT}`)
})