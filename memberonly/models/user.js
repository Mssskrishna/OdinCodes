const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstname: { type: String, required: true, maxLength: 100 },
    lastname: {
        type: String, required: true, maxLength: 100
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    membership: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;