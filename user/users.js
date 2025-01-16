const router = require("express").Router();
const { User, validate } = require("./user");
const Token = require("./token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")

// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('./model');
// const nodemailer = require('nodemailer');
const { generateOtp } = require('../utils/otp');

const sendVerificationEmail = (userEmail, code) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "kaliomlk81@gmail.com",
				pass: "suckbllxsoiktyoh",
			},
  });

  const mailOptions = {
    from: "kaliomlk81@gmail.com",
    to: userEmail,
    subject: 'Email Verification',
    text: `Your verification code is: ${code}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
// const imapConfig = {
// 	imap: {
// 	  user: 'kaliomlk81@gmail.com',
// 	  password: 'suckbllxsoiktyoh',
// 	  host: 'imap.gmail.com', // Gmail's IMAP host
// 	  port: 993,
// 	  tls: true,
// 	  authTimeout: 3000
// 	}
//   };

router.post("/signup", async (req, res) => {
	  const { email, username, password } = req.body;

	try {
	    const hashedPassword = await bcrypt.hash(password, 10);
	    const verificationCode = crypto.randomBytes(3).toString('hex');
	
	    const newUser = new User({
	      email,
	      username,
	      password: hashedPassword,
	      verificationCode,
	    });
	
	    await newUser.save();
	
	    // Send verification email
	    sendVerificationEmail(email, verificationCode);
	
	    res.status(201).json({ message: 'User registered. Check your email for verification code.' });
	  } catch (err) {
	    res.status(500).json({ error: 'Registration failed' });
	  }
	// try {
	// 	const { error } = validate(req.body);
	// 	if (error)
	// 		return res.status(400).send({ message: error.details[0].message });

	// 	let user = await User.findOne({ email: req.body.email });
	// 	if (user)
	// 		return res
	// 			.status(409)
	// 			.send({ message: "User with given email already Exist!" });

	// 	const salt = await bcrypt.genSalt(Number(process.env.SALT));
	// 	const hashPassword = await bcrypt.hash(req.body.password, salt);

	// 	user = await new User({ ...req.body, password: hashPassword }).save();

	// 	const token = await new Token({
	// 		userId: user._id,
	// 		token: crypto.randomBytes(32).toString("hex"),
	// 	}).save();
	// 	const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
	// 	await sendEmail(user.email, "Verify Email", url);

	// 	res
	// 		.status(201)
	// 		.send({ message: "An Email sent to your account please verify" });
	// } catch (error) {
	// 	console.log(error);
	// 	res.status(500).send({ message: "Something went wrong" });
	// }
});


router.post('/verify-email', async (req, res) => {
	const { email, verificationCode } = req.body;
	try {
	  const user = await User.findOne({ email });
  
	  if (!user || user.verificationCode !== verificationCode) {
		return res.status(400).json({ error: 'Invalid verification code' });
	  }
  
	  user.verified = true;
	  user.verificationCode = null;
	  await user.save();
  
	  res.status(200).json({ message: 'Email verified successfully' });
	} catch (err) {
	  res.status(500).json({ message: 'Verification failed' });
	}
  });

router.post("/verify/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.body.id });
		if (!user) return res.status(400).send({ errMessage: "User doesn't exist" });
		
		const token = await Token.findOne({
			userId: user._id,
			token: req.body.token,
		});
		if (!token) return res.status(400).send({ errMessage: "Something went wrong" });

		await User.updateOne({_id:req.body.id}, { verified: true });
		await token.remove();
		
		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ errMessage: "Something went wrong" });
	}
	// try {
	// 	const user = await User.findOne({ _id: req.params.id });
	// 	if (!user) return res.status(400).send({ message: "Invalid link" });

	// 	const token = await Token.findOne({
	// 		userId: user._id,
	// 		token: req.params.token,
	// 	});
	// 	if (!token) return res.status(400).send({ message: "Invalid link" });

	// 	await User.updateOne({ _id: user._id, verified: true });
	// 	await token.remove();

	// 	res.status(200).send({ message: "Email verified successfully" });
	// } catch (error) {
	// 	res.status(500).send({ message: "Internal Server Error" });
	// }
});

// app.get('/fetch-emails', (req, res) => {
// 	imaps.connect(imapConfig).then((connection) => {
// 	  return connection.openBox('INBOX').then(() => {
// 		const searchCriteria = ['UNSEEN']; // You can use 'ALL' to fetch all emails, or 'UNSEEN' for unread emails.
// 		const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };
  
// 		return connection.search(searchCriteria, fetchOptions).then((messages) => {
// 		  const fetchedEmails = messages.map((message) => {
// 			const header = message.parts.filter((part) => part.which === 'HEADER')[0];
// 			const body = message.parts.filter((part) => part.which === 'TEXT')[0];
  
// 			return {
// 			  subject: header.body.subject[0],
// 			  from: header.body.from[0],
// 			  date: header.body.date[0],
// 			  body: body.body
// 			};
// 		  });
  
// 		  connection.end();
// 		  res.status(200).send(fetchedEmails);
// 		});
// 	  });
// 	}).catch((error) => {
// 	  console.error("Error fetching emails:", error);
// 	  res.status(500).send({ success: false, message: 'Failed to fetch emails.' });
// 	});
//   });
  
router.post('/send-email', async (req, res) => {

	let transporter = nodemailer.createTransport({
		service: 'gmail', // You can use any SMTP service (e.g., Gmail, Outlook, etc.)
		auth: {
		  user: 'kaliomlk81@gmail.com', // Your email address
		  pass: 'suckbllxsoiktyoh'   // Your email password (use app password for Gmail)
		}
	  });
	

let mailOptions = {
    from: 'kaliomlk81@gmail.com',
    to: "ka81@gmail.com",
    subject: "hello",
    text: "ooo"
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    res.status(200).send({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({ success: false, message: 'Failed to send email.' });
  }
});

module.exports = router;
