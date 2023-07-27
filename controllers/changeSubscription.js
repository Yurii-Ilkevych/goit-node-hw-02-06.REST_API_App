const { User } = require("../service/schemas");
const { HttpError } = require("../helper");
const allowedSubscriptions = ["starter", "pro", "business"];

const changeSubscription = async (req, res, next) => {
  const { body, user } = req;
  if (!body) {
    throw HttpError(404, "Not Found");
  }
  if (!allowedSubscriptions.includes(body.subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }
  const response = await User.findByIdAndUpdate({ _id: user._id }, body, {
    new: true,
  });
  res.status(201).json(response);
};

module.exports = changeSubscription;
