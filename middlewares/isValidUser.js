const { userSchemaValid } = require("../service/schemas");
const HttpError = require("../helper/HttpError");

const isValidUser = (req, res, next) => {
  const { body } = req;
  const value = userSchemaValid.validate(body);
  if (value.error) {
    next(HttpError(400, value.error));
  }
  next();
};

module.exports = isValidUser;
