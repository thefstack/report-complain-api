const express=require("express");
const app=express();


const PORT=process.env.PORT || 5000;

require("./db/conn.js")

const userRouter=require("./routers/userRouter.js")
const departmentUserRouter=require("./routers/departmentUserRouter.js");

app.use(express.json())
app.use("/user",userRouter);
app.use("/duser",departmentUserRouter);



app.listen(PORT,()=>{
    console.log(`Listening to PORT : ${PORT}`)
})