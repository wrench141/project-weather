const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db.config");
const searchRoutes = require("./routes/history");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

//api endpoints
app.use("/weather.api.v1/", searchRoutes);

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log("server started")
    })
}).catch((err) => {
    console.log(err)
})