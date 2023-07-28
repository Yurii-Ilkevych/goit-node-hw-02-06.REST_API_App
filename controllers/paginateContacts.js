const contacts = require("../service");
const { HttpError } = require("../helper");

const paginateContacts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
  if (Object.keys(req.query).length === 0) {
    throw HttpError(400, "Invalid query value");
  }
  const skip = (page - 1) * limit;
  const response = await contacts.paginateContacts(skip, limit, req.user._id);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

module.exports = paginateContacts;
