const router = require('express').Router();
const { User } = require('../models/user');
const Token = require('../models/token');
const joi = require('joi');
const passwordComplexity = require('joi-password-complexity');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

router.post("/", async (req, res) => {

    try {

        const emailSchema = joi.object({
            email: joi.string().email().required().label("Email")
        });

        const { error } = emailSchema.validate(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        let user = await User.findOne({ email: req.body.email });

        if (!user)
            return res.status(409).json({ message: "User with given email does not exist" });

        let token = await Token.findOne({ userId: user._id });

        if (!token) {
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save();
        }

        const url = `${process.env.BASE_URL}password-reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password Reset", url);

        res.status(200).json({ message: "Password reset link sent to your email account" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

router.get("/:id/:token", async (req, res) => {

    try {

        const user = await User.findOne({ _id: req.params.id });

        if (!user)
            return res.status(400).json({ message: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if (!token)
            return res.status(400).json({ message: "Invalid Link" });

        res.status(200).json({ message: "Valid URL" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

router.post("/:id/:token", async (req, res) => {

    try {

        passwordSchema = joi.object({
            password: passwordComplexity().required().label("Password"),
            confirmPassword: passwordComplexity().required().label("Confirm Password")
        });

        const { error } = passwordSchema.validate(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: "Password doesn't match with Confirm Password" });
        }

        const user = await User.findOne({ _id: req.params.id });

        if (!user)
            return res.status(400).json({ message: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if (!token)
            return res.status(400).status({ message: "Invalid Link" });

        if (!user.verified)
            user.verified = true;

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user.password = hashPassword;

        await user.save();
        await token.deleteOne();

        res.status(200).json({ message: "Password Reset Successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

module.exports = router;