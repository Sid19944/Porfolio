import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
  senderName: {
    type: String,
    minlength: [2, "Name must at lest 2 character"],
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  readed: {
    type: Boolean,
    default: false,
  },
  sendedAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Message = mongoose.model("Message", messageSchema);
