const express = require('express')
// controller
const userController = require('../controllers/user')

const router = express.Router()

router
  .get('/', userController.getAll)
  .get('/:id', userController.getById)
  .post('/', userController.createUser)
  .put('/:id', userController.updateUser)
  .delete('/:id', userController.deleteUser)

module.exports = router
