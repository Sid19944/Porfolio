import { dbconnect } from "./database/db.connect.js";
import dotenv from "dotenv";
dotenv.config("./.env");
import { app } from "./app.js";
import cloudinary from "cloudinary"

const PORT = process.env.PORT;

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});



dbconnect()
  .then(() => {
    console.log("Connectios successfully with MONGODB");
    app.listen(PORT, () => {
      console.log("server is listing on PORT : ", PORT);
    });
  })
  .catch((err) => {
    console.log("Something wrong while connecting wiht db", err);
  });
