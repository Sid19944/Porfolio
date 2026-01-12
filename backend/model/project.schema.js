import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    technologies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
      },
    ],
    deployed: {
      type: Boolean,
      default: false,
    },
    stack: {
      type: String,
      required: true,
    },
    gitHubUrl: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
