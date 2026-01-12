import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addProject,
  allProject,
  updateProject,
  deleteProject,
  
  deletePtojectsTech,
  addNewTechAfterAddProject,
  getSingleProject,
} from "../controllers/project.controller.js";

const router = Router();

router.route("/all").get(allProject); //
router.route("/single/:id").get(getSingleProject); //

router.route("/add/project").post(verifyJWT, addProject); //
router.route("/update/:id").put(verifyJWT, updateProject); //
router.route("/delete/:id").delete(verifyJWT, deleteProject); //
router
  .route("/:id/delete/tech/:techId")
  .delete(verifyJWT, deletePtojectsTech); //
router.route("/:id/add/new/tech").put(verifyJWT, addNewTechAfterAddProject); //

export default router;
