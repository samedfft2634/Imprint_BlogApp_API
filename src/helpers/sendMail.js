"use strict";
/* __________________ Mail Sender __________________ */
const nodemailer = require("nodemailer");

module.exports = function (to, subject, message) {
	return null; // take in comment this line

	//? GoogleMail (gmail)
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "samedfft@gmail.com",
			pass: "ihof qizt bxdc sshw",
		},
	});

	transporter.sendMail(
		{
			to,
			subject,
			text: message,
			html: message,
		},
		(err, success) => {
			err
				? console.log("error: ", err)
				: console.log("success: ", success);
		}
	);
};
