const mongoose = require("mongoose");
const UserSchema = require('../FoodHubbackendmodel/Users.schema.server');
const UserModel = mongoose.model('UserModel', UserSchema);

createUser = (userObject) => {
  return UserModel.create({
    username: userObject.username,
    password: userObject.password
  })
}


module.exports = {
  createUser
}




