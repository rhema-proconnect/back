const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	// 64374e149d6d5acbde3ac61cca4c2b5633d8db65a11a33ac66f9080b8ca55606
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "kaliomlk81@gmail.com",
				pass: "suckbllxsoiktyoh",
			},
		});
		await transporter.sendMail({
			from: "kaliomlk81@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email de confiramtion a ete envoyer avec success");
	} catch (error) {
		console.log("Verifiez vos informations");
		console.log(error);
		return error;
	}
};
