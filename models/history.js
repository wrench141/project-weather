const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const history = mongoose.Schema({
    uid: {type: String, reuqired: true},
    history: [{type: String, require:true}]
});


history.methods.getToken = function(){
    const token = jwt.sign(this.uid, process.env.SALT);
    return token;
}

const History = mongoose.model("history", history);
module.exports = History;