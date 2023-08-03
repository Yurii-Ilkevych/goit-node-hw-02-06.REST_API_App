const isValidId = require("./isValid")
const ValidBody = require("./validBody")
const auth = require("./auth")
const isValidUser = require("./isValidUser")
const isOwnerOfContact = require("./isOwnerOfContact")
const uploadMiddleware = require("./uploadMiddleware")
const isValidUserEmail = require("./isValidUserEmail")

module.exports = { isValidId, ValidBody, auth, isValidUser, isOwnerOfContact, uploadMiddleware, isValidUserEmail };

