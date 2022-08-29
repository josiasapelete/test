const UserModal=require('../Models/UserModel');
const bcrypt=require('bcrypt');

//Fonction Pour inscription
module.exports.registerUser= async(req,res)=>{
    const {email,password,firstname,lastname}=req.body;
    
    try {
        const user= await UserModal.create({email,password,firstname,lastname});
        res.status(200).json({user:user.email})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports.login= async (req,res)=>{
    const {email,password}=req.body;
    const user= await UserModal.findOne({email});

    try {
        if(user){
        const verifyPass= await bcrypt.compare(password,user.password);
        
        verifyPass? res.status(200).json(`${user} connected avec succès `) :res.status(404).json('Password incorrect')
        } else{
            res.status(404).json("User does'nt exist");
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}