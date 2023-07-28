const { Contact } = require("./schemas");

const listContacts = async (userId) => {
  return Contact.find({ owner: userId }, { owner: 0 });
};
const getContactById = async (contactId, userId) => {
  return Contact.findOne({ _id: contactId, owner: userId }, { owner: 0 });
};

const addContact = async ({ name, email, phone }, userId) => {
  const createdContact = await Contact.create({
    name,
    email,
    phone,
    owner: userId,
  });
  return Contact.findById({ _id: createdContact._id }, { owner: 0 });
};

const removeContact = async (contactId) => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};

const filterContactByFavorite = async ({ favorite }, userId) => {
  return Contact.find({ favorite, owner: userId }, { owner: 0 });
};

const paginateContacts = async (skip, limit, userId) => {
  return Contact.find({ owner: userId }, { owner: 0 }).skip(skip).limit(limit);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  filterContactByFavorite,
  paginateContacts,
};
