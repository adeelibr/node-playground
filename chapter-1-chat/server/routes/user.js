import express from 'express';
// controllers
import user from '../controllers/user.js';
// middlewares
import { decode } from '../middlewares/jwt.js'

const router = express.Router();

router
  .get('/', decode, user.onGetAllUsers)
  .post('/', decode, user.onCreateUser)
  .get('/:id', decode, user.onGetUserById)
  .post('/get-users', decode, user.onGetUsersByIds)
  .delete('/:id', decode, user.onDeleteUserById)

export default router;
