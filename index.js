"use strict";
/* __________ Imprint BLog App API Service _________ */

const express = require("express");
const app = express();

require("dotenv").config();
const HOST = process.env?.HOST || "127.0.0.1";
const PORT = process.env?.PORT || 8000;

/* ___________________ Connection __________________ */

const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* __________________ Middlewares __________________ */

app.use(express.json());

app.use("/upload", express.static("./upload"));

app.use(require('./src/middlewares/logger'))

app.use(require('./src/middlewares/queryHandler'))

/* _____________________ Routes ____________________ */

app.all("/", (req, res) => {
	res.send({
		error: false,
		message: "Welcome to BLOG API",
		docs: {
			swagger: "/documents/swagger",
			redoc: "/documents/redoc",
			json: "/documents/json",
		},
		// user: req.user,
	});
});

app.use(require("./src/routes"));

/* ______________________________________________ */

app.use(require("./src/middlewares/errorHandler"));

app.listen(PORT, HOST, () => console.log(`http://${HOST}:${PORT}`));
// require("./src/helpers/sync")();
// node swaggerAutogen.js 