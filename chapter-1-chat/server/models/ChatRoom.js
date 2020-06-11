import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const CHAT_ROOM_TYPES = {
  USER_TO_USER: "user-to-user",
};

const chatRoomSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4.replace(/-g/, ""),
    },
    users: Array,
    type: {
      type: String,
      default: () => CHAT_ROOM_TYPES.USER_TO_USER,
    },
    chatInitiator: String,
  },
  {
    timestamps: true,
    collection: "ChatRooms",
  }
);

export default model("ChatRooms", chatRoomSchema);
