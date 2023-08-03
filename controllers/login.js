const { User } = require("../service/schemas");
const { HttpError } = require("../helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.validPassword(password)) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: user._id }, secret, {
    expiresIn: "1w",
  });


  await User.findByIdAndUpdate(user._id, {token})
  res.status(200).json({
    token: token,
    user: {
      email: email,
      subscription: "starter",
    },
  });

};

module.exports = login
