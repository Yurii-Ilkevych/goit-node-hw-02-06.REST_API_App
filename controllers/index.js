const { controllerWrapper } = require("../helper");

const getContacts = require("./getContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContatcById = require("./deleteContatcById");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateStatusContact");
const registration = require("./registration")
const login = require("./login")
const logout = require("./logout")
const getCurrentUser = require("./getCurrentUser")
const changeSubscription = require("./changeSubscription")
const filterContactByFavorite = require("./filterContactByFavorite")
const paginateContacts = require("./paginateContacts")

module.exports = {
  getContacts: controllerWrapper(getContacts),
  getContactById: controllerWrapper(getContactById),
  addContact: controllerWrapper(addContact),
  deleteContatcById: controllerWrapper(deleteContatcById),
  updateContact: controllerWrapper(updateContact),
  updateStatusContact: controllerWrapper(updateStatusContact),
  registration: controllerWrapper(registration),
  login: controllerWrapper(login),
  logout:controllerWrapper(logout),
  getCurrentUser: controllerWrapper(getCurrentUser),
  changeSubscription: controllerWrapper(changeSubscription),
  filterContactByFavorite: controllerWrapper(filterContactByFavorite),
  paginateContacts: controllerWrapper(paginateContacts),
};
