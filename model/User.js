const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
});

const user = mongoose.model("User", userSchema);
module.exports = user;
