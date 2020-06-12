import ChatRoomModel, { CHAT_ROOM_TYPES } from '../models/ChatRoom.js';
import ChatMessageModel from '../models/ChatMessage.js';
// utils
import makeValidation from '../utils/makeValidation.js';

export default {
  initiate: async (req, res) => {
    try {
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          userIds: { type: types.arrayOfStrings, options: { unique: true, empty: false } },
          type: { type: types.enum, options: { enums: CHAT_ROOM_TYPES } },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const { userIds, type } = req.body;
      const { userId: chatInitiator } = req;
      const allUserIds = [...userIds, chatInitiator];
      const chatRoom = await ChatRoomModel.initiateChat(allUserIds, type, chatInitiator);
      return res.status(200).json({ success: true, chatRoom });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  postMessage: async (req, res) => {
    try {
      const { roomId } = req.params;
      const validation = makeValidation(types => ({
        payload: req.body,
        checks: {
          messageText: { type: types.string },
        }
      }));
      if (!validation.success) return res.status(400).json({ ...validation });

      const messagePayload = {
        messageText: req.body.messageText,
      };
      const currentLoggedUser = req.userId;
      const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
      global.io.sockets.in(roomId).emit('new message', { message: post });
      return res.status(200).json({ success: true, post });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  deleteRoomById: async (req, res) => {
    try {
      const { roomId } = req.params;
      await ChatRoomModel.deleteChatById(roomId);
      await ChatMessageModel.deleteMessagesByChatRoomId(roomId);
      return res.status(200).json({ success: true, message: "Deleted chat room along with all of it's messages" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  deleteMessageById: async (req, res) => {
    try {
      const { messageId } = req.params;
      await ChatMessageModel.deleteMessagesById(messageId);
      return res.status(200).json({ success: true, message: "Deleted message" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getRecentConversation: async (req, res) => {
    try {
      const rooms = await ChatRoomModel.getChatRoomsByUserId();
      return res.status(200).json({ success: true, rooms });
    } catch (error) {
      return res.status(500).json({ success: false, error: error })
    }
  },
  getConversationByRoomId: async (req, res) => {

  },
  markConversationReadByRoomId: async (req, res) => {

  },
}