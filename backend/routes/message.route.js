import { Router } from "express";
import {
  sendMessage,
  getAllMessage,
  deleteMessage,
  setReaded,
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/send").post(sendMessage);
router.route("/getall").get(getAllMessage);
router.route("/readed/:id").put(verifyJWT, setReaded);
router.route("/delete/:id").delete(verifyJWT, deleteMessage);

export default router;
