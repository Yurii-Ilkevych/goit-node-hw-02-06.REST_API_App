const { User } = require("../service/schemas");
const { HttpError, processingAvatar } = require("../helper");
const path = require("path");

const updateAvatar = async (req, res, next)=>{
    const {user} = req;
    const { path: tempUpload, filename } = req.file;
    if (!tempUpload) {
        throw HttpError(404, "Not Found");
      }
      const resProcessing = await processingAvatar(tempUpload, filename)
      if(resProcessing.err){
        throw HttpError(500, "Photo processing error on the server");
      }
      const avatarURL = path.join("avatars", resProcessing)
      const response = await User.findByIdAndUpdate({ _id: user._id }, avatarURL);
if (!response) {
    throw HttpError(404, "Not Found");
  }
     res.status(201).json(avatarURL)

}

module.exports = updateAvatar