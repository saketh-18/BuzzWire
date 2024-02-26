// to authenticate login and register routes ....
// assign jwt
import express from "express";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/user.js";
import verifyToken from "./verifyToken.js";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const saltRounds = 10;
const secret = "secret";
const port = 5000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials : true , origin : "http://localhost:5173"}));

mongoose.connect("mongodb://localhost:27017/BWusers").then(() => {
    console.log("connected to database");
}).catch((e) => {
    console.log(e);
})

app.post("/register" , async (req , res) => {
    const {username , password} = req.body;

    //hashing the password
    try {
        bcrypt.hash(password , saltRounds , (err , hashedPass) => {
            if(err) throw err;
            const newUser = new User({
                username : username ,
                password : hashedPass
            })
            newUser.save();
        }) 
    }
    catch(e) {
        console.log(e);
    }
});

app.post("/login" , async (req , res) => {
    const {username , password} = req.body;
    console.log(username , password);
    
    const currentUser = await User.findOne({username : username});
    console.log("currentUser" , currentUser);
    //comparing the passwords:
    try {
        if(currentUser) {
            bcrypt.compare(password , currentUser.password , (err , result) => {
                if(result) {
                    console.log("succesfully logged in");
                    //generating a json web token
                    const user = {username : username , id : currentUser._id}
                    jwt.sign(user , process.env.SECRET_KEY , (err , token) => {
                        if (err) throw err;
                        res.cookie('token' , token ).json({msg : "succesfully logged in"});
                    })
                    
                }
                else {
                    console.log("wrong password" , err);
                }
            }) 
        }
        else {
            console.log("user does'nt exist try regitering");
        }
    }
    catch(er) {
        console.log(er);
    }
})
app.get("/profile" , verifyToken , async (req , res) => {
    console.log(process.env.SECRET_KEY);
    res.json(req.user);

})

app.listen(port , () => {
    console.log("listening on port " + port);
})
