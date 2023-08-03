const {userSchemaValidEmail} = require("../service/schemas")
const HttpError = require("../helper/HttpError");

const isValidUserEmail = async (req, res, next)=>{

    const { body } = req;
    const value = userSchemaValidEmail.validate(body);
    if (value.error) {
      next(HttpError(400, value.error));
    }
    next();
}

module.exports = isValidUserEmail