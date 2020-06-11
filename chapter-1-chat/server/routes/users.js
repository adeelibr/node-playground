import express from 'express';
// controllers
import users from '../controllers/user.js';

const router = express.Router();

router
  .get('/', users.onGetAllUsers)
  .get('/:id', users.onGetUser)
  .post('/', users.onCreateUser)

export default router;
