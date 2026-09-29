const jwt = require("jsonwebtoken")
const User = require("../model/user.model")
const protectRoute = async(req, res, next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unathorized - No Token Provided"})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error: "Unathorized - No Token Provided"})
        }

        const user = await User.findById(decoded.userid).select("-password")
        req.user = user.id;
        next()
    }catch(error) {
        console.log(error.message)
        res.status(500).json({error: "Internal server error"})
    }
} 

module.exports = protectRoute;