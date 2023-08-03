const { HttpError } = require("../helper");
const { User } = require("../service/schemas");
const gravatar = require('gravatar');
const { nanoid } = require("nanoid");
const { verifyService } = require("../helper/verifyService");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, {s: '250'});
  const verificationToken = nanoid(18);

  const response = await verifyService(email, verificationToken);

  if (response !== "ok") {
    throw HttpError(500, "Oops, something went wrong, please try it again");
  }

  const newUser = new User({ email, avatarURL,  verificationToken });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
      avatarURL
    },
  });
};

module.exports = registration;
