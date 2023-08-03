const express = require("express");
const router = express.Router();
const {
  isValidId,
  ValidBody,
  auth,
  isOwnerOfContact,
} = require("../../middlewares");
const {
  getContacts,
  getContactById,
  addContact,
  deleteContatcById,
  updateContact,
  updateStatusContact,
  filterContactByFavorite,
  paginateContacts,
} = require("../../controllers");

router.get("/filter", auth, filterContactByFavorite);
router.get("/paginate", auth, paginateContacts);

router.get("/", auth, getContacts);

router.get("/:contactId", auth, isValidId, getContactById);

router.post("/", auth, ValidBody.ValidFullContact, addContact);

router.delete(
  "/:contactId",
  auth,
  isValidId,
  isOwnerOfContact,
  deleteContatcById
);

router.put(
  "/:contactId",
  auth,
  isValidId,
  isOwnerOfContact,
  ValidBody.ValidFullContact,
  updateContact
);

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  ValidBody.ValidFavorite,
  isOwnerOfContact,
  updateStatusContact
);

module.exports = router;
