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
import multer from "multer";
const upload = multer({ dest: 'uploads/' });
import Post from "./models/Post.js";
import fs from 'fs';
dotenv.config();

const app = express();
const saltRounds = 10;
const secret = "secret";
const port = 5000; 

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({credentials : true , origin : "http://localhost:5174"}));

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
    // console.log(process.env.SECRET_KEY);
    res.json(req.user);

})

app.get("/logout" , (req , res) => {
    res.cookie('token' , '').json({msg :"ok"});
    console.log("succesfully logged out");
})

app.post("/post" ,  upload.single('file') ,(req , res) => {
    console.log(req.file)
    const {originalname , path } = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length -1];
    const newPath = path+"."+ext;
    fs.renameSync(path , newPath);

    const {title , summary , content , author} = req.body;

    const newPost = new Post({
        title , summary , cover : newPath , content , author
    })

    newPost.save();
    console.log(newPost);

})

app.get("/post" , async (req , res) => {
     res.json(await Post.find({}).limit(3));
})

app.get("/allpost" , async (req , res) => {
    res.json(await Post.find({}));
})

app.get("/postCover" , async (req , res) => {
    const { cover } = req.body
    res.json(await Post.find({cover}))
})

app.get("/post/:id" , async (req , res) => {
    const {id} = req.params;

    try {
        const post = await Post.findById(id);
        
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})

app.listen(port , () => {
    console.log("listening on port " + port);
})
