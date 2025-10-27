import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/user.route";

configDotenv();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", userRoutes);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(port, () => {
      console.log(`Server connected at ${port}.`);
    });
  })
  .catch((error) => console.error("Mongodb Error:", error));
