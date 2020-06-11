import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

const readByRecipientSchema = new Schema(
  {
    _id: false,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: false,
  }
);

const chatMessageSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4.replace(/-g/, ""),
    },
    chatRoomId: Array,
    message: Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    postedByUser: String,
    read_by_recipients: [readByRecipientSchema],
  },
  {
    timestamps: true,
    collection: "ChatMessages",
  }
);

export default model("ChatMessages", chatMessageSchema);
