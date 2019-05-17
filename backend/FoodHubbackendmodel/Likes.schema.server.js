const mongoose = require("mongoose");
const LikesSchema = mongoose.Schema({
  Recipe: {type: mongoose.Types.Schema.ObjectId, ref: 'RecipeModel'},
  User: {type: mongoose.Types.Schema.ObjectId, ref: 'UserModel'}
}, {collection: "Likes"});

module.exports = LikesSchema;
