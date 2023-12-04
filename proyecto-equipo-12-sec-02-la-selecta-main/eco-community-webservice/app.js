const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const database = require("./config/database.config")
const apiRouter = require("./routes/index.router");



const app = express();

database.connect();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//Static router
app.use(express.static(path.join(__dirname, 'public')));

//API router

app.use("/api", apiRouter);

app.use((error, req, res, next) => {
    console.error(error);
    return res.status(500).json({error: "Internal server error"})
})

module.exports = app;
