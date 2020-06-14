const jwt = require('jsonwebtoken')

const SECRET_KEY = '1234567!'

const auth = {
  decode: (req, res, next) => {
    if (!req.headers['authorization']) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    try {
      const token = req.headers.authorization.split(' ')[1] // Bearer <auth-token>
      const decoded = jwt.decode(token, SECRET_KEY)
      req.information = decoded
      return next()
    } catch (error) {
      console.log(error)
      return res.status(401).json({
        success: false,
        message: 'Invalid auth token'
      })
    }
  },
  encode: (req, res, next) => {
    const payload = {
      username: req.body.username,
      password: req.body.password
    }
    // perform some db operations to check if the user information is
    // correct or not.
    const token = jwt.sign(payload, SECRET_KEY)
    req.token = token
    next()
  }
}

module.exports = auth
