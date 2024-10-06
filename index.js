const express = require('express');
const mongoose = require("mongoose");
const {userRouter} = require("./Routes/user");
const {courseRouter} = require("./Routes/course");
const {adminRouter} = require("./Routes/admin");
const app = express();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/admin",adminRouter);
app.use("/api/v1/course",courseRouter);

async function main(){
    // .env usage here :\
    await mongoose.connect("mongodb+srv://sYan:qTAYM3EaEM9qwdi8@cluster0.j59zvyi.mongodb.net/coursera-App");
    app.listen(3000);
    console.log("listening @ 3000");
}
main();
