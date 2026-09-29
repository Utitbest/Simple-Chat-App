const User = require("../model/user.model");



const getUsersForSidebar = async(req, res)=>{
    try {
        const loggedInUserId = req.user;
        const filterUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")


        res.status(200).json(filterUsers)
    } catch (error) {
        res.status(500).json({error: "Failed to get users"})
        console.log(error.message)
    }
}

module.exports = getUsersForSidebar;