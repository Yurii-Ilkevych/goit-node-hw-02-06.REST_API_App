const contacts = require("../service");
const { HttpError } = require("../helper");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const {user} = req
  console.log(user._id)
  const response = await contacts.getContactById(contactId, user._id);
  if (!response) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(response);
};

module.exports = getContactById;
