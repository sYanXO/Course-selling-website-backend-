const express = require('express');
const app = express();

app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);


app.listen(3000);