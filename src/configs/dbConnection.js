"use strict";
/* _________________ DB Connection _________________ */
const mongoose = require("mongoose");

const dbConnection = function () {
	mongoose
		.connect(process.env.MONGODB)
		.then(() => console.log("*** DB Connected ***"))
		.catch((err) => console.log("!!! DB Connection Failed !!!", err));
};

module.exports = { mongoose, dbConnection }