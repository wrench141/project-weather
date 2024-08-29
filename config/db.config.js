const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async() => {
    try {
        mongoose.connect(process.env.DB).then(() => {
            console.log("DB connected")
        })        
    } catch (error) {
        console.log(error);
    }
}


module.exports = connectDb