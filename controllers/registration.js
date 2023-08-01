const { HttpError } = require("../helper");
const { User } = require("../service/schemas");
const gravatar = require('gravatar');


const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const avatarURL = gravatar.url(email, {s: '250'});
  const newUser = new User({ email, avatarURL });
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
