const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const body = req.body;
        const email = body.email;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(409)
                .json({
                    message: "User already exist", staus: 409
                });
        }
        const user = new User(body);
        user.password = await bcrypt.hash(body.password, 10);
        await user.save();
        return res.status(201)
            .json({ message: "success" });
    } catch (err) {
        res.status(500)
            .json({ message: "internal server error", err });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user is exist or not
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403)
                .json({ message: "Auth failed username/password incorrect" });
        }
        //chekc password is correct or not
        const isPassMatch = await bcrypt.compare(password, user.password);
        if (!isPassMatch) {
            return res.status(403)
                .json({ message: "Auth failed username/password incorrect" });
        }
        const userObject = {
            email,
            name: user.name,
            _id: user._id
        }
        const jwtToken = jwt.sign(userObject,
            process.env.JWT_SECRET,
            { expiresIn: '4h' });
        userObject.jwtToken = jwtToken;
        res.status(200)
            .json({ message: 'success', userObject });

    } catch (err) {
        res.status(500)
            .json({ message: "internal server error", err });
    }
}
module.exports = {
    registerUser,
    loginUser
}