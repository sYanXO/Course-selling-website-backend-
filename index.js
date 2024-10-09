require('dotenv').config()

const express = require('express');
const mongoose = require("mongoose");
const {userRouter} = require("./Routes/user");
const {courseRouter} = require("./Routes/course");
const {adminRouter} = require("./Routes/admin");
const app = express();
app.use(express.json());

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

async function main(){
    // .env usage here :\
    await mongoose.connect(process.env.Mng_url);
    app.listen(3000);
    console.log("listening @ 3000");
}
main();
