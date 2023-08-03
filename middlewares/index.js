const isValidId = require("./isValid")
const ValidBody = require("./validBody")
const auth = require("./auth")
const isValidUser = require("./isValidUser")
const isOwnerOfContact = require("./isOwnerOfContact")

module.exports = { isValidId, ValidBody, auth, isValidUser, isOwnerOfContact };