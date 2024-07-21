const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const UserModel = mongoose.model("users", UserSchema); // 'users' is the name of the collection in the database
module.exports = UserModel;
