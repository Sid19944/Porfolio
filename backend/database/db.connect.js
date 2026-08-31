import mongoose from "mongoose";

export const dbconnect = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URL}`);
  } catch (err) {
    console.log("Error while connecting with database ", err);
    console.log("DB Connection Failed");
    process.exit(1);
  }
};
