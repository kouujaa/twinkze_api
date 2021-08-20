const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    default: "",
    maxlength: 200,
    lowercase: true
  },
  profilePicURL: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/onlyfansclone.appspot.com/o/Defaults%2Fuser-4-256.png?alt=media&token=baf9ef66-b9c6-421b-9d20-ddc4b4198d88"
  },
  status: { type: String, default: "user" },
  lastName: {
    type: String,
    maxlength: 200,
    default: "",
    lowercase: true
  },
  googleID: { type: String },
  facebookID: { type: String },
  password: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1020
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    maxlength: 1000,
    lowercase: true
  },
  userName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 500,
    unique: true,
    lowercase: true
  },
  gender: {
    type: String,
    enum: ["Male", "Female"]
  },
  dateJoined: { type: Date, default: Date.now },
  subbedCreators: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Creators", default: [] }
  ],
  interests: { type: [String] },
  walletBalance: { type: Number, default: 0 },
  likedpictures: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Pictures", default: [] }
  ],
  likedVideos: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Videos", default: [] }
  ]
});

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

// User.watch().on("change", data => console.log(new Date(), data));

const validateUser = Joi.object({
  password: Joi.string()
    .min(3)
    .max(50),
  passwordAgain: Joi.string()
    .min(3)
    .max(50),
  userName: Joi.string()
    .min(3)
    .max(50)
    .required(),
  email: Joi.string()
    .min(8)
    .max(500)
    .email()
    .required(),
  googleID: Joi.string()
    .min(15)
    .max(500),
  gender: Joi.string()
    .min(3)
    .max(6),
  interests: Joi.array()
});

exports.userSchema = userSchema;
exports.User = User;
exports.validateUser = validateUser;
