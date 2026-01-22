import dotenv from "dotenv";
dotenv.config(); // 👈 MUST be at the very top

import connectDB from "./db/index.js";
import app from "./app.js";

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server Run on Port : ", PORT);
    });
  })
  .catch((err) => {
    console.log("MONGODB Connection failed ", err);
  });
