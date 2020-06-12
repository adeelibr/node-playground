import express from 'express';
// controllers
import chatRoom from '../controllers/chatRoom.js';
// middlewares
import { decode } from '../middlewares/jwt.js'

const router = express.Router();

router
  .post('/initiate', decode, chatRoom.initiate)
  .get('/recent-conversation', decode, chatRoom.getRecentConversation)
  .get('/:roomId', decode, chatRoom.getConversationByRoomId)
  .post('/:roomId/message', decode, chatRoom.postMessage)
  .put('/:roomId/mark-read', decode, chatRoom.markConversationReadByRoomId)
  .delete('/:roomId', decode, chatRoom.deleteRoomById)
  .delete('/all/message/:messageId', decode, chatRoom.deleteMessageById)


export default router;
