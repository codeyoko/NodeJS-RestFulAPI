const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    username: String,
    password: String
}, {
    collection: 'users'
});





// Create UserModel
const UserModel = mongoose.model('users', User);

module.exports = UserModel;