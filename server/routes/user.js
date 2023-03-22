const router = require('express').Router();
const { User, validate } = require('../models/user');
const Token = require('../models/token');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');

router.post("/", async (req, res) => {

    try {
        const { error } = validate(req.body);

        if (error)
            return res.status(400).json({ message: error.details[0].message });

        if (req.body.password !== req.body.confirmPassword) {
            return res.status(400).json({ message: "Password doesn't match with Confirm Password" });
        }

        let user = await User.findOne({ email: req.body.email });

        if (user)
            return res.status(409).json({ message: "User with given email id already exists!" });

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({ ...req.body, password: hashPassword }).save();

        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        res.status(401).json({ message: "An email sent to your account please verify" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

router.get("/:id/verify/:token", async (req, res) => {

    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).json({ message: "Invalid Link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        });

        if (!token) return res.status(400).json({ message: "Invalid Link" });

        await User.updateOne({ _id: user._id, verified: true });

        await token.deleteOne();

        res.status(200).json({ message: "Email Verified Successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;