const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");
const bcrypt = require("bcrypt");
const regexMail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const schemaFullContact = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9()+-\s]+$/)
    .required(),
  name: Joi.string()
    .min(3)
    .max(25)
    .required()
    .pattern(/^[\s\S]*$/),
  email: Joi.string()
    .required()
    .email({ tlds: { allow: ["com", "net", "ua", "ca", "uk"] } })
    .pattern(regexMail)
    .required(),
  favorite: Joi.boolean(),
});

const schemaFavoriteContact = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: regexMail,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 5,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: regexMail,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false }
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(6));
};
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userSchemaValid = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com", "net", "ua", "ca", "uk"] } })
    .pattern(regexMail)
    .required(),
  password: Joi.string()
    .required()
    .min(5)
    .max(25)
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)/),
});


const userSchemaValidEmail = Joi.object({email: Joi.string()
  .email({ tlds: { allow: ["com", "net", "ua", "ca", "uk"] } })
  .pattern(regexMail)
  .required(),})

const Contact = mongoose.model("contact", contactSchema);
const User = mongoose.model("user", userSchema);
module.exports = {
  Contact,
  schemaFullContact,
  schemaFavoriteContact,
  User,
  userSchemaValid,
  userSchemaValidEmail
};
