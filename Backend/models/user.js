import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
        required : true ,
        unique : true ,
        minlength : [4 , "username must be greater than 4 characters"]
    } ,
    password: {
        type : String ,
        required: true ,
        minlength : [6 , "password must be greater than 6 characters"],
    }
})

const User = mongoose.model('User' , userSchema);

export default User;