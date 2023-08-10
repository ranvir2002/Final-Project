let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");
let user = mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
      trim: true,
      required: "Username is required",
    },

    email: {
      type: String,
      default: "",
      trim: true,
      required: "Email is required",
    },
    displayname: {
      type: String,
      default: "",
      trim: true,
      required: "Display Name is required",
    },
    created: {
      type: Date,
      default: Date.now,
    },
    update: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "users",
  }
);

let options = { missingPasswordError: "Wrong/Missing password" };
user.plugin(passportLocalMongoose, options);
module.exports.user = mongoose.model("user", user);
