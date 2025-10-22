import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: 'ai-ticket-agent',
      to,
      subject,
      text, 
    });

    console.log("Message sent:", info.messageId);
    return info
  } catch (error) {
    console.log('Error sending mail:',error)
    throw error
  }
};
