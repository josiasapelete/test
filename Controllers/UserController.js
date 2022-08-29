const UserModal = require('../Models/UserModel.js');
const bcrypt=require('bcrypt');

module.exports.getAllUsers= async (req,res)=>{
    const users= await UserModal.find().select('-password');
    res.status(200).json(users);
}


module.exports.getUser = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    UserModal.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password');
}
module.exports.updateUser = async (req, res) => {

    const id=req.params.id;
    const {currentUserId, currentUserAdminStatus, password}=req.body;

    if(id=== currentUserId || currentUserAdminStatus){
        try {
            if(password){
                const salt=await bcrypt.genSalt(10);
                req.body.password= await bcrypt.hash(password,salt)
            }
            const user= await UserModal.findByIdAndUpdate(id,req.body,{new:true});
            res.status(200).json(user);
        } catch (err) {
            return res.status(500).json({ message: err });
        }
    } else{
        res.status(403).json("You can't update this account")
    }

    
};

//delete
module.exports.deleteUser= async (req,res)=>{
    const id =req.params.id;
    const {currentUserId, currentUserAdminStatus}=req.body;
    if(currentUserId===id||currentUserAdminStatus){
        try {
            await UserModal.findByIdAndDelete(id);
            res.status(200).json("User deleted with success")
        } catch (error) {
            return res.status(500).json({ message: error.message });
            
        }
    } else{
        res.status(403).json("You are not allowed to delete this account")
    }
}

//Follow
module.exports.followUser= async (req,res)=>{
    const id =req.params.id;
    const {currentUserId}=req.body
    if(currentUserId===id){
        res.status(403).json("Action forbidden")
    } else{
        try {
            const followUser= await UserModal.findById(id);
            const followingUser= await UserModal.findById(currentUserId);

            if(!followUser.followers.includes(currentUserId)){
                await followUser.updateOne({$push:{followers:currentUserId}});
                await followingUser.updateOne({$push:{followings:id}});
                res.status(200).json("User followed");
            } else{
                res.status(403).json("You are already folloxing ")
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
            
        }
    }
}

//unFollow
module.exports.unfollowUser= async (req,res)=>{
    const id =req.params.id;
    const {currentUserId}=req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden")
    } else{
        try {
            const unfollowUser= await UserModal.findById(id);
            const unfollowingUser= await UserModal.findById(currentUserId);

            if(unfollowUser.followers.includes(currentUserId)){
                await unfollowUser.updateOne({$pull:{followers:currentUserId}});
                await unfollowingUser.updateOne({$pull:{followings:id}});
                res.status(200).json("User unfollowed");
            } else{
                res.status(403).json("You are not following ")
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
            
        }
    }
}