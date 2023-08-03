const { HttpError } = require("../helper");
const { User } = require("../service/schemas");

const registration = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();
  res.status(201).json({
    user: {
      email: email,
      subscription: "starter",
    },
  });
};

module.exports = registration;
