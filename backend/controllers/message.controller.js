import { Message } from "../model/message.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../utils/errorHandler.js";
import httpStatus from "http-status";

const sendMessage = asyncHandler(async (req, res, next) => {
  const { senderName, email, message } = req.body;
  if (!senderName || !email || !message) {
    return next(new ErrorHandler("Please fill full Form", 400));
  }
  if ([senderName, email, message].some((field) => field?.trim() === "")) {
    return next(new ErrorHandler("Please fill full Form", 400));
  }

  const response = await Message.create({
    senderName,
    email: email.toLowerCase(),
    message,
  });
  if (!response) {
    return next();
  }

  return res.status(httpStatus.CREATED).json({
    success: true,
    message: "Messeage send",
  });
});

const getAllMessage = asyncHandler(async (req, res, next) => {

  const allMessage = await Message.find();

  return res.status(200).json({
    success: true,
    allMessage : allMessage,
  });
});

const setReaded = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Message.updateOne(
    { _id: id },
    { $set: { readed: true } },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Message Marked Readed",
  });
});

const deleteMessage = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);

  if (!message) {
    return next(new ErrorHandler("Message does't exist", 400));
  }

  await message.deleteOne();
  return res.status(httpStatus.OK).json({
    success: true,
    message: "Message Deleted Successfylly",
  });
});

export { sendMessage, getAllMessage, deleteMessage, setReaded };
