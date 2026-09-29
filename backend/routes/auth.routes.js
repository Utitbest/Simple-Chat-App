const express = require("express")
const { SignUp, Logout, Login } = require("../controllers/auth.controller")
const router = express.Router()


router.post("/signup", SignUp)

router.post("/logout", Logout)

router.post("/login", Login)

module.exports = router;