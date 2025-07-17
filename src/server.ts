import { app } from "./http/app";

import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5500;

const startingServer = async () => {
  try {
    console.log("Starting...");
    app.listen(port, () => {
      setTimeout(() => {
        console.log(`Server is running on port: ${port}`);
      }, 1000);
    });
  } catch (err: any) {
    console.error(`Error starting server: ${err.message}`);
    process.exit(1);
  }
};

startingServer();
