const express = require("express")
const dotenv = require("dotenv").config()
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 5000
const ConnectDB = require("./configDB/ConnectDB")
const cors = require("cors");
const { server, app } = require("./socket/socket")
const path = require("path")

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/message", require("./routes/message.routes"))
app.use("/api/users", require("./routes/user.routes"))

const frontendPath = path.resolve(__dirname, "../frontend/dist") 

app.use(express.static(frontendPath))

app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(frontendPath, "index.html"))
})

server.listen(PORT, ()=>{
  ConnectDB()
  console.log(`Server is running on port ${PORT}`)
})