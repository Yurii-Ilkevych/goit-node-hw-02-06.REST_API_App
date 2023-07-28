const contacts = require("../service");
const { HttpError } = require("../helper");

const filterContactByFavorite = async (req, res, next) => {
  const { query, user } = req;
  console.log(query)
  if (Object.keys(query).length === 0) {
    throw HttpError(400, "Invalid query value");
  }
  const response = await contacts.filterContactByFavorite(query, user._id);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

module.exports = filterContactByFavorite;
