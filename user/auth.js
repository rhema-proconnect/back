const router = require("express").Router();
const { User } = require("./user");
const Token = require("./token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const axios = require('axios');
const nodemailer = require("nodemailer");


const GOOGLE_CLOUD_API_KEY = 'AIzaSyBGTR7vZD81pSOxEQ9Aob-CLy9EKd59O0A';

router.post('/translate', async (req, res) => {
	const { text, targetLanguage } = req.body;
  
	try {
	  const response = await axios.post(
		`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_CLOUD_API_KEY}`,
		{
		  q: text,
		  target: targetLanguage,
		}
	  );
	  res.json(response.data.data.translations[0].translatedText);
	} catch (error) {
	  res.status(500).json({ error: 'Error translating text' });
	}
  });

router.post("/login", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			return res.status(401).send({ message: "Invalid Email or Password" });
			// let token = await Token.findOne({ userId: user._id });
			// if (!token) {
			// 	token = await new Token({
			// 		userId: user._id,
			// 		token: crypto.randomBytes(32).toString("hex"),
			// 	}).save();
			// 	const url = `${process.env.BASE_URL}users/${user.id}/verify/${token.token}`;
			// 	await sendEmail(user.email, "Verify Email", url);
			// }

			// return res
			// 	.status(400)
			// 	.send({ message: "An Email sent to your account please verify" });
		}

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/all/users", async (req, res) => {
	const user = await User.find();
	res.status(200).json({
		success: true,
		data: user
	});
});

router.get("/users/:id", async (req, res) => {
	const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).send({errMessage: `Page not found with id of ${req.params.id}`})
    }
    res.status(200).json({ success: true, data: user });
});

router.put("/users/:id", async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
            res.status(404).send({
                message: `Cannot update User with id=${id}. Maybe User was not found!`
            });
            } else res.status(201).json({ message: "User was updated successfully.", newData:data });
        })
        .catch(err => {
            res.status(500).send({
            message: "Error updating User with id=" + id
            });
        });
});

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send({ message: 'User not found' });

    // Generate and save reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    // Create reset URL
    const resetUrl = `https://f4-five.vercel.app/reset-password/${resetToken}`;
    // const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;

    // Send email using nodemailer
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
			port: 465,
			secure: true,
			auth: {
				user: "kaliomlk81@gmail.com",
				pass: "suckbllxsoiktyoh",
			},
    });

    const message = {
        from: 'kaliomlk81@gmail.com',
        to: user.email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Please click on the link to reset your password: ${resetUrl}`,
    };

    try {
        await transporter.sendMail(message);
        res.status(200).send({ message: 'Email sent!' });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();
        res.status(500).send({ message: 'Email could not be sent' });
    }
});


router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token to match with database
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching token and check if token is not expired
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }, // Token is valid if not expired
    });

    if (!user) return res.status(400).send({ message: 'Token is invalid or has expired' });

    // Hash new password and update user
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).send({ message: 'Password updated successfully' });
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
