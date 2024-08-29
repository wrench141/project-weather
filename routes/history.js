const { getHistory, searchReport } = require("../controllers/weather");

const searchRoutes = require("express").Router();

searchRoutes.get("/history", getHistory);
searchRoutes.get("/search/:place", searchReport)

module.exports = searchRoutes