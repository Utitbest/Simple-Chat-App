const mongoose = require('mongoose');

const ConnectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`${mongoose.connection.name} is connected to MongoDB`)
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message)
    }
}
module.exports = ConnectDB;