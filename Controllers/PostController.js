const PostModel=require('../Models/postModel.js');
const mongoose= require('mongoose');
const ObjectID=require('mongoose').Types.ObjectId;

//Create Post
module.exports.createPost= async (req,res)=>{
    const newPost=req.body;
    try {
        await PostModel.create(newPost);
        res.status(200).json("Post created");
    } catch (error) {
        res.status(500).json(error)
    }
}

//Get a post
module.exports.getPost= async (req,res)=>{
    const id =req.params.id;
    try {
        const post= await PostModel.findById(id);
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error)
        
    }
}

//update posts
module.exports.updatePost= async (req,res)=>{
    const postId =req.params.id;
    const {userId}=req.body
    try {
        const post= await PostModel.findById(postId);
        if(post.userId===userId){
            await post.updateOne({$set:req.body})
            res.status(200).json("Post updated")
        }else{
            res.status(403).json("You are not allowed to update this post")
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
}

//delete post

module.exports.deletePost= async (req,res)=>{
    const id = req.params.id;
    const {userId}= req.body
    try {
        const post= await PostModel.findById(id);
        if(post.userId===userId){
            await post.deleteOne();
            res.status(200).json("Post deleted successfull")
        }else{
            res.status(403).json("You are not allowed to delete this post")

        }
    } catch (error) {
        res.status(500).json(error)
        
    }
}

//likes dislike
module.exports.likePost= async (req,res)=>{
    const postId=req.params.id;
    const {userId}=req.body;
    try {
        const post= await PostModel.findById(postId);
        if(!post.likes.includes(userId)){
            await post.updateOne({$push:{likes:userId}});
            res.status(200).json("Post Liked sucussfull");
        }else{
            await post.updateOne({$pull:{likes:userId}});
            res.status(200).json("Post unliked succussfull")
        }
    } catch (error) {
        res.status(500).json(error)
        
    }
}