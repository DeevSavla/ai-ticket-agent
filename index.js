import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import userRoutes from "./routes/user.route.js";
import ticketRoutes from "./routes/ticket.route.js";
import { serve } from "inngest/express";
import { inngest } from "./inngest/client.js";
import { onUserSignUp } from "./inngest/functions/on-signup.js";
import { onTicketCreated } from "./inngest/functions/on-create.ticket.js";

configDotenv();

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/api/auth", userRoutes);
app.use("/api/tickets", ticketRoutes);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions: [onUserSignUp, onTicketCreated],
  })
);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(port, () => {
      console.log(`Server connected at ${port}.`);
    });
  })
  .catch((error) => console.error("Mongodb Error:", error));
