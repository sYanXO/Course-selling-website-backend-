const {Router} = require("express");
const jwt = require("jsonwebtoken");
const {userModel, purchasesModel} = require("../db");
const {JWT_USER_PASSWORD} = require("../config");
const userRouter = Router();
const {userMiddleware} = require("../middlewares/userMiddleware")
userRouter.post("/signup", async function(req,res){
    const {email,password,firstname,lastname} = req.body;// add zod validation
    // hash the password : do at home before storing in db
    try{
    await userModel.create({
        email,
        password,
        firstname,
        lastname
        })
        res.json({
            message:"signup suceeded"
        })
    }
    catch{
        res.json({
            message:"signup failed"
        })
    }


})

userRouter.post("/signin", async function(req,res){
    const {email,password} = req.body;
    // ideally passwrd shud be hashed, hence cmpare the hashes instead 0f the original passwrds.....hashes 0f same passwrds are the sameeeeeeeeeeeeeee
    const user = await userModel.findOne({
        email:email,
        password:password
    });
    if(user){
        const token = jwt.sign({
            id: user._id
        },JWT_USER_PASSWORD);
        res.json({
            token:token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials!"
        })
    }
})

userRouter.get("/purchases",userMiddleware ,async function(req,res){
    const userId= req.userId;
    const purchases = await purchasesModel.find({
        userId
    });
    res.json({
        purchases
    })
})

module.exports = {
    userRouter:userRouter,
    
}