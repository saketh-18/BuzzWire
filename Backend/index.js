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
import axios from "axios";
dotenv.config();

const app = express();
const saltRounds = 10;
const secret = "secret";
const port = 5000; 

app.use(bodyParser.json());
app.use(cookieParser());
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(cors({
  credentials: true,
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

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

const SPORTMONKS_KEY = "0BCKMFGbGzkbOXzggB76vKcbW11zrpFIhuV9W1QzHgHliofDpIUdXHtVR44c";
const SPORTMONKS_BASE = "https://cricket.sportmonks.com/api/v2.0";

// Simple in-memory cache
const teamCache = {};

async function getTeamDetails(teamId) {
  if (teamCache[teamId]) {
    return teamCache[teamId];
  }

  try {
    const res = await axios.get(`${SPORTMONKS_BASE}/teams/${teamId}`, {
      params: { api_token: SPORTMONKS_KEY },
    });
    const team = res.data.data;
    const teamData = {
      id: team.id,
      name: team.name,
      logo: team.image_path,
    };
    teamCache[teamId] = teamData; // Cache it
    return teamData;
  } catch (err) {
    console.error(`Error fetching team ${teamId}:`, err.message);
    return { id: teamId, name: `Team ${teamId}`, logo: "" };
  }
}

app.get("/api/cricket", async (req, res) => {
  try {
    // Step 1: Get fixtures
    const fixtureRes = await axios.get(`${SPORTMONKS_BASE}/fixtures`, {
      params: { api_token: SPORTMONKS_KEY, page: 1 },
    });
    const fixtures = fixtureRes.data.data;

    // Step 2: Enrich with team names/logos
    const enrichedFixtures = await Promise.all(
      fixtures.map(async (match) => {
        const localteam = await getTeamDetails(match.localteam_id);
        const visitorteam = await getTeamDetails(match.visitorteam_id);

        return {
          ...match,
          localteam,
          visitorteam,
        };
      })
    );

    res.json(enrichedFixtures);
  } catch (error) {
    console.error("Error fetching from Sportmonks:", error.message);
    res.status(500).json({
      error: "Error fetching data from Sportmonks",
      details: error.message,
    });
  }
});

// app.get("/api/cricket", async (req, res) => {
//   try {
//     const response = await axios.get("https://cricket.sportmonks.com/api/v2.0/fixtures", {
//       params: {
//         api_token: "0BCKMFGbGzkbOXzggB76vKcbW11zrpFIhuV9W1QzHgHliofDpIUdXHtVR44c",
//         page: 1,
//       }
//     });

//     res.json(response.data);
//   } catch (error) {
//     console.error("Error fetching from Sportmonks:", error.response?.data || error.message);
//     res.status(500).json({
//       error: "Error fetching data from Sportmonks",
//       details: error.response?.data || error.message,
//     });
//   }
// });

// app.get("/api/cricket", async (req, res) => {
//   try {
//     const response = await axios.get("https://cricket.sportmonks.com/api/v2.0/fixtures", {
//       params: {
//         api_token: "0BCKMFGbGzkbOXzggB76vKcbW11zrpFIhuV9W1QzHgHliofDpIUdXHtVR44c",
//         page: 1,
//       }
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch cricket data" });
//   }
// });



app.listen(port , () => {
    console.log("listening on port " + port);
})
