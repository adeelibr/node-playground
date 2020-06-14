const express = require('express')
// controller
const userController = require('../controllers/user')
// middlewares
const auth = require('../middlewares/auth')

const router = express.Router()

router
  .get('/', auth.decode, userController.getAll)
  .post('/middleware-login-demo', auth.encode, (req, res) => {
    return res.status(200).json({ success: true, token: req.token })
  })
  .get('/:id', userController.getById)
  .post('/', userController.createUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)

module.exports = router
