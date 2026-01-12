import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addSkill,
  allSkills,
  updateSkill,
  deleteSkill,
  getOneSkill,
} from "../controllers/skill.controller.js";

const router = Router();

router.route("/all").get(allSkills);
// Verified routes
router.route("/add/skill").post(verifyJWT, addSkill);
router.route("/update/:id").put(verifyJWT, updateSkill);
router.route("/delete/:id").delete(verifyJWT, deleteSkill);
router.route("/one/:id").get(getOneSkill);

export default router;
