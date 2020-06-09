import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

const readByRecipientSchema = new Schema(
  {
    _id: false,
    read_by_user: String,
    read_at: {
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
    room_id: Array,
    message: Schema.Types.Mixed,
    type: String,
    posted_by_user: String,
    read_by_recipients: [readByRecipientSchema],
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "ChatMessages",
  }
);

export default model("ChatMessages", chatMessageSchema);
