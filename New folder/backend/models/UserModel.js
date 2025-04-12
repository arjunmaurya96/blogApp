const mongoose = require("mongoose")
const validate = require("validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true,
        validate: [validate.isEmail, "Please enter a valid email"]
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    photo: {
      public_id:{
        type:String,
        required:true
      },
      url:{
        type:String,
        required:true
      }
    },
    education: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"]
    },
    password: {
        type: String,
        required: true,
        minlenght: 8,
        select: false
    },
    token:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

})

const User = mongoose.model("User", userSchema);
module.exports = User;