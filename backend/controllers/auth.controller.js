const User = require("../model/user.model")    
const bcrypt = require("bcrypt")
const generateTokenAndSetCookie = require("../utils/generateToken")

const SignUp = async(req, res)=>{
    try {
        const {fullName, username, password, confirmPassword, gender } = req.body;

        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({msg: "All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({msg: "Password must be at least 6 characters"})
        }
        if(password !== confirmPassword){
            return res.status(400).json({msg: "Password do not match"})
        }

        const userExist = await User.findOne({username})
        
        if(userExist){
            return res.status(400).json({msg: "Username already exists"})
        }

        // hash password
        const salt = await  bcrypt.genSalt(10)
        const haspassword = await bcrypt.hash(password, salt);
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`


        const newUser = new User({
            fullName,
            username,
            password: haspassword,
            gender,
            profilePicture: gender === "male"  ? boyProfilePic : girlProfilePic
        })

       if(newUser){
            await generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                gender: newUser.gender,
                profilePic: newUser.profilePicture
            })   
       }else{
            res.status(400).json({error: "Invalid user data"})
       } 
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error"})
        console.log(error.message)
    }
}

const Login = async(req, res)=>{
    try {
        const {username, password} = req.body

        const user = await User.findOne({username})
        const comparePassword = await bcrypt.compare(password, user?.password || "")

        if(!user || !comparePassword){
            return res.status(400).json({error: "Invalid username or password"});
        }

        await generateTokenAndSetCookie(user._id, res)
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            gender: user.gender,
            profilePic: user.profilePicture
        }) 
    } catch (error) {
        res.status(500).json({msg: "Failed to login user"})
        console.log(error.message)
    }
}

const Logout = async(req, res)=>{
    try{
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({message: " Logged out successfully!"})
    }catch(error){
        res.status(500).json({msg: "Failed to loggout user!"})
        console.log(error.message)
    }
} 


module.exports = { SignUp, Login, Logout }