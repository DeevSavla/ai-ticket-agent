import { NonRetriableError } from "inngest";
import { userModel } from "../../models/user.model";
import { inngest } from "../client";
import { sendMail } from "../../utils/mailer";

export const onUserSignUp = inngest.createFunction(
  {
    id: "on-user-signup",
    retries: 2,
  },
  {
    event: "user/signup",
  },
  async ({ event, step }) => {
    try {
      const { email } = event.data;
      const user = await step.run("get-user-email", async () => {
        const userObject = await userModel.findOne({ email });
        if (!userObject) {
          throw new NonRetriableError("user not found");
        }
        return userObject;
      });

      await step.run("send-welcome-email", async () => {
        const subject = "Welcome to the app";
        const message = `Hi,\n\n Thanks for signing up. We are glad to have you onboard!`;
        await sendMail(user.email, subject, message);
      });

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error running inngest step:", error.message);
      return {
        success: false,
      };
    }
  }
);
