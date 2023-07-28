const { HttpError } = require("../helper");

const getCurrentUser = async (req, res, next) => {
  const { user } = req;
console.log(user)
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  res.status(200).json({ email: user.email, subscription: user.subscription });
};

module.exports = getCurrentUser