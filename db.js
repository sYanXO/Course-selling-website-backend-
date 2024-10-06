const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://sYan:qTAYM3EaEM9qwdi8@cluster0.j59zvyi.mongodb.net/coursera-App");
console.log("db cnnected!!")
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    email:{type:String, unique:true},
    password:String,
    firstname:String,
    lastname:String
});

const adminSchema = new Schema({
    email:{type:String, unique:true},
    password:String,
    firstname:String,
    lastname:String
});

const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    creatorId:ObjectId
});

const purchaseSchema = new Schema({
    userId:ObjectId, // refers to users schema
    courseId:ObjectId // refers to courses schema
});

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("courses",courseSchema);
const purchasesModel = mongoose.model("purchases",purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchasesModel
}
