const {Router} = require("express");
const { adminModel } = require("../db");
const jwt = require("jsonwebtoken");
// bcrypt ,zod , jwt 

const adminRouter = Router();

const JWT_ADMIN_PASSWORD = "teriii-mkc";
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


adminRouter.post("/",function (req,res){

})

adminRouter.put("/",function (req,res){

})

adminRouter.get("/bulk",function (req,res){

})

module.exports ={
    adminRouter:adminRouter
}


