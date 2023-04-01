const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb://localhost:27017/ceoitbox");

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    data: Array
})

const allDataSchema = mongoose.Schema({
    customerName:String,
    salesPerson:String,
    course:String,
    coursePrice:Number,
    customerEmail:String,
    customerPhone:Number,
    formula:String,
    photo:String,
    PILink:String,
    PIDate:String,
    checkbox:String,
    welcomeNote:String,
    userID:String
})

const UserModel = mongoose.model("user", userSchema);
const AllDataModel = mongoose.model("AllData", allDataSchema);

module.exports = {
    connection,
    UserModel,
    AllDataModel
}