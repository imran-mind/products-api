const mongoose = require('mongoose');
const validator = require("validator");
const Schema = mongoose.Schema;


const UserModel = new Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw Error("Not valid Email")
                }
            }
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('users', UserModel);