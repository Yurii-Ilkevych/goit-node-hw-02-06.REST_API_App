const {Contact} = require("../service/schemas")
const {HttpError} = require("../helper")

const isOwnerOfContact = async (req, res, next)=>{
    const { contactId } = req.params;
    const { user } = req;
    const contact = await Contact.findById({ _id: contactId, owner: user._id });
    if (!contact) {
      next(HttpError(404, "Not Found"));
    }else if(contact.owner.toString() !== user._id.toString()){
      next(HttpError(403, "Forbidden"))
    }
    next()
}

module.exports = isOwnerOfContact