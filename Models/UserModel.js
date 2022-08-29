const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const {isEmail}= require('validator')
const UserSchema=new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            validate:[isEmail],
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true,
            minlength:6
        },
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        profilePicture: String,
        coverPicture: String,
        about: String,
        livesIn:String,
        worksAt:String,
        relationShip:String,
        followers:[],
        followings:[]
    },{timestamps:true}
);

UserSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password,salt);
    next();
});
const UserModal= mongoose.model('User',UserSchema);

module.exports= UserModal;