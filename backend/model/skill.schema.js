import mongoose, { Schema } from "mongoose";
import { Project } from "./project.schema.js";

const skillSchema = new Schema(
  {
    skillName: {
      type: String,
      required: true,
    },
    skillImage: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

skillSchema.post("findOneAndDelete", async (skill) => {
  await Project.updateMany(
    {},
    {
      $pull: {
        technologies: skill._id,
      },
    }
  );
});

export const Skill = mongoose.model("Skill", skillSchema);
