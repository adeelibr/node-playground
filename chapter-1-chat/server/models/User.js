import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
  ADMIN: "admin",
  CONSUMER: "consumer",
};

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4.replace(/-g/, ""),
    },
    first_name: String,
    last_name: String,
    phone_number: String,
    location: String,
    type: String,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    collection: "Users",
  }
);

export default model("Users", userSchema);
