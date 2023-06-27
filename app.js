const express = require("express");
const connectDB = require("./config/db");
const app = express();

const mongoose = require("mongoose");
require("./models/Post");
const Post = mongoose.model("posts");

connectDB();

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/" , (req , res)=>{

    const getPosts = async () => {
        try {
            const posts = await Post.find();
            // console.log(posts);
            res.locals.Posts = posts;
            res.render('dashboard');
        } catch (error) {
            console.log(error);   
            res.render('error404');      
        }
    };

    getPosts();
    
});

// app.delete("/delete" , (req , res)=>{
//     const {title , desc} = req.body;
//     console.log(req);
// });

const postRouter = require("./routes/post");
app.use("/post" , postRouter);

app.get("*" , (req , res)=>{
    res.send("<h1>Error 404: Not found!!</h1>")
});


app.listen(3000 , ()=>{
    console.log("Server started");
});