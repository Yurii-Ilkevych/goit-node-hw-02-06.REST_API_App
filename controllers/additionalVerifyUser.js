const { HttpError } = require("../helper");
const { User } = require("../service/schemas");
const { verifyService } = require("../helper/verifyService");

const additionalVerifyUser = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    throw HttpError(401, "missing required field email");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "Not Found User");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const response = await verifyService(email, user.verificationToken);

  if (response !== "ok") {
    throw HttpError(500, "Oops, something went wrong, please try it again");
  }

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = additionalVerifyUser;
