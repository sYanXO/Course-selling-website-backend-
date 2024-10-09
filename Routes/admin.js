const {Router} = require("express");
const { adminModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
// bcrypt ,zod , jwt 

const adminRouter = Router();

const {JWT_ADMIN_PASSWORD} = require("../config");
const {adminMiddleware} = require("../middlewares/adminMiddleware");
adminRouter.post("/signup", async function(req,res){
    const {email,password,firstname,lastname} = req.body;// add zod validation
    // hash the password : do at home before storing in db
    try{
    await adminModel.create({
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

adminRouter.post("/signin", async function(req,res){
    const {email,password} = req.body;
    // ideally passwrd shud be hashed, hence cmpare the hashes instead 0f the original passwrds.....hashes 0f same passwrds are the sameeeeeeeeeeeeeee
    const user = await adminModel.findOne({
        email:email,
        password:password
    });
    if(user){
        const token = jwt.sign({
            id: user._id
        },JWT_ADMIN_PASSWORD);
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


adminRouter.post("/course",adminMiddleware,async function (req,res){
    const adminId = req.userId;
    const { title,description,imageUrl,price} = req.body;

    const course = await courseModel.create({
        title,description,imageUrl,price,creatorId:adminId
    })
    res.json({
        message : "course created!",
        courseId : course._id
    })
})

adminRouter.put("/course",adminMiddleware,async function (req,res){
    const adminId = req.userId;
    const { title,description,imageUrl,price,courseId} = req.body;

    

    const course = await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        
    })
    res.json({
        message : "course updated!",
        courseId : course._id
    })
})

adminRouter.get("/course/bulk",adminMiddleware,async function (req,res){
    const adminId= req.userId
    const courses = await courseModel.find({
        creatorId:adminId
    })
    res.json({
        courses
    })
})

module.exports ={
    adminRouter:adminRouter
}


