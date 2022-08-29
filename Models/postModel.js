const mongoose = require('mongoose');

const PostSchema= new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        desc: String,
        likes:[],
        image: String
    },
    {
        timestamps:true
    }
)
const PostModel= mongoose.model('Post',PostSchema);

module.exports= PostModel;