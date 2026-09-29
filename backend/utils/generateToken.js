const jwt = require("jsonwebtoken")

const generateTokenAndSetCookie = async (userid, res)=>{
    const token = jwt.sign({userid}, process.env.JWT_SECRET,{
        expiresIn: "10d",
    })
    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

module.exports = generateTokenAndSetCookie;