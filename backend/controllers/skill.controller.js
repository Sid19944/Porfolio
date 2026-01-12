import ErrorHandler from "../utils/errorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Skill } from "../model/skill.schema.js";
import httpStatus from "http-status";
import { v2 as cloudinary } from "cloudinary";

const addSkill = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Image is required", 400));
  }
  const { skillImage } = req.files;
  const { skillName } = req.body;
  if (!skillName || skillName?.trim() === "") {
    return next(new ErrorHandler("Skill name is required", 400));
  }

  const cloudinaryResForSkillImage = await cloudinary.uploader.upload(
    skillImage.tempFilePath,
    {
      folder: "SKILL'S IMAGES",
    }
  );

  if (!cloudinaryResForSkillImage || cloudinaryResForSkillImage.error) {
    console.log(
      `Cloudinary Error`,
      cloudinaryResForSkillImage.error || "Unknown error while uploading skill"
    );
    return;
  }

  const skillPublic_id = cloudinaryResForSkillImage.public_id;
  const skillUrl = cloudinaryResForSkillImage.secure_url;

  if (!skillPublic_id || !skillUrl) {
    console.log("Invalid response from cloudinary");
    return;
  }

  const skill = await Skill.create({
    skillName,
    skillImage: { public_id: skillPublic_id, url: skillUrl },
  });

  if (!skill) {
    await cloudinary.uploader.destroy(skillPublic_id);
    return next(
      new ErrorHandler("Something wrong while saving the skill", 500)
    );
  }

  return res.status(200).json({
    success: true,
    message: "New Skill added",
  });
});

const allSkills = asyncHandler(async (req, res, next) => {
  const skills = await Skill.find();
  if (!skills) {
    return next(new ErrorHandler("Something Went Wrong in database"));
  }
  return res
    .status(200)
    .json({ success: true, message: "All skills found successfully", skills });
});

const updateSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id); //fiind the skill

  const newSkillDetail = {
    skillName: req.body.skillName?.trim(),
  };

  if (req.files && req.files.skillImage) {
    const { skillImage } = req.files;

    const cloudinaryResForSkillImage = await cloudinary.uploader.upload(
      skillImage.tempFilePath,
      {
        folder: "SKILL'S IMAGES",
      }
    );

    if (!cloudinaryResForSkillImage || cloudinaryResForSkillImage.error) {
      return next(
        new ErrorHandler("Something wrong whil uploading new File", 400)
      );
    }

    newSkillDetail.skillImage = {
      public_id: cloudinaryResForSkillImage.public_id,
      url: cloudinaryResForSkillImage.secure_url,
    };

    await cloudinary.uploader.destroy(skill.skillImage.public_id);
    console.log("Old image deleted");
  }

  await skill.updateOne(newSkillDetail);

  return res
    .status(200)
    .json({ success: true, message: "Skill updated successfully" });
});

const deleteSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findByIdAndDelete(id);
  const public_id = skill.skillImage.public_id;
  await cloudinary.uploader.destroy(public_id);
  return res
    .status(200)
    .json({ message: "Skill deleted successfully", success: true });
});

const getOneSkill = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const skill = await Skill.findById(id);
  if (!skill) {
    return next(new ErrorHandler("Invalid Skill ID", 400));
  }
  return res.status(200).json({
    success: true,
    message: "One Skill Found successfully",
    skill,
  });
});

export { addSkill, allSkills, updateSkill, deleteSkill, getOneSkill };
