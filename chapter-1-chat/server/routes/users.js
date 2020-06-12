import express from 'express';
// controllers
import users from '../controllers/user.js';

const router = express.Router();

router
  .get('/', users.onGetAllUsers)
  .get('/:id', users.onGetUserById)
  .post('/', users.onCreateUser)
  .post('/get-users', users.onGetUsersById)
  .delete('/:id', users.onDeleteUserById)

export default router;
