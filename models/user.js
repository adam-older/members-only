const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  username: {
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
  membership_status: {
    type: Boolean,
    default: false,
  },
});

userSchema.virtual("url").get(function () {
  return "/users/" + this._id;
});

userSchema.virtual("formatted_creation_date").get(function () {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return this.creation_date.toLocaleDateString("en-US", options);
});

module.exports = mongoose.model("User", userSchema);
