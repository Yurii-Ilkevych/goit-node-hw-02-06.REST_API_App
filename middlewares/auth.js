const passport = require("../service/passport")


const auth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      
      if (!user || err || user.token === "") {
        return res.status(401).json("Not authorized")
      }
      req.user = user
      next()
    })(req, res, next)
  }

  module.exports = auth