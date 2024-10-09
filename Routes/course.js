const {Router} = require("express");
const {userMiddleware} = require("../middlewares/userMiddleware");
const user = require("./user");
const { userModel, purchasesModel } = require("../db");
const courseRouter = Router();
courseRouter.get("/preview",userMiddleware, function(req,res){
    
})

courseRouter.post("/purchase", userMiddleware,async function(req,res){
     const userId = req.userId
     const courseId = req.body.courseId;
    await purchasesModel.create({
        userId,
        courseId
    });
    res.json({
        message:"You have succesfully bought the course"
    })
})

module.exports = {
    courseRouter:courseRouter
}