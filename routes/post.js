const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

require("../models/Post");
const Post = mongoose.model("posts");

router.get("/create/new" , (req , res)=>{
    res.render("newPost")
});


router.post("/create/new" , async (req , res)=>{
    try {
        
        const {title , desc} = req.body;

        //create a new post
        const post = await Post.create({
            title: title,
            description: desc
        });

        console.log(post);
        
        res.send({
            status: "success"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: "Something went wrong",
        });
    }
});


router.delete("/delete" , async  (req , res)=>{
    try {
        const {title , desc} = req.body;

        console.log(title);

        const post = await Post.deleteOne({
            title: title,
            description: desc
        })

        res.status(200).send({
            status: "success"
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error:"Something went wrong"
        });
        
    }
});



module.exports = router;