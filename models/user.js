const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: [validator.isEmail, "invalid email"],
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.virtual("name").get(function () {
  return this.first_name + " " + this.last_name;
});

userSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

module.exports = mongoose.model("User", userSchema);
