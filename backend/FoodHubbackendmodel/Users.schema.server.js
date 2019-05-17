const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  username: String,
  password: String
}, {collection: "Users"});


module.exports = UserSchema;



