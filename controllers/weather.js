const History = require("../models/history");
const uuid =  require("uuid");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const getHistory = async(req, res) => {
    try {
        const token = req.headers.token;
        const uid = jwt.decode(token, process.env.SALT);
        const user_history = await History.findOne({uid});
        console.log(user_history)
        if(user_history){
            res.status(200).json({data: user_history.history.slice(user_history.history.length - 5)});
        }else{
            res.status(404).json({data: "search for desired location"});
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({data: "server error, please try again"})
    }
}

const searchReport = async(req, res) => {
    try {
        const token = req.headers.token;
        const place = req.params.place;

        const uid = jwt.decode(token, process.env.SALT);
        const user_history = await History.findOne({uid}) || null;
        
        if(uid && user_history){
            user_history.history = [...user_history.history, place];
            await user_history.save();
            res.status(200).json({data: "history saved"});
        }else{
            let history_queries = [place]
            const newUser = new History({
                uid: uuid.v4(),
                history: history_queries
            });
            await newUser.save();
            const token = newUser.getToken();
            res.status(200).json({data: "history saved", token})
        }
    } catch (error) {
        console.log(error);
        res.status(200).json({data: "server error, please try again"})
    }
};



module.exports = {getHistory, searchReport}