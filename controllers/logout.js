const { User } = require("../service/schemas");
require("dotenv").config();

const logout = async (req, res, next)=>{
    const {user} = req
await User.findByIdAndUpdate(user._id, {token: ""})

      res.status(204).json()
}


module.exports = logout