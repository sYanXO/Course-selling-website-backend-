const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
function adminMiddleware(req,res,next) { 
     const token = req.body.authorization;
     const decoded = jwt.verify(token,JWT_ADMIN_PASSWORD);
    
    if(decoded){
        req.userId=decoded.id;
        next();
    }
    else{
        res.json({
            message:"you arent signed in"
        })
    }
}
module.exports = {
    adminMiddleware:adminMiddleware
}