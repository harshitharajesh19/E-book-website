import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email",                    //  Replace with your Gmail
    pass: "your-email-password",          //  Replace with your Gmail App Password
  }
});

export const sendResetEmail = async (to, resetLink) => {
  await transporter.sendMail({
    from: '"Notify Support" <your-email>',        // Use the same email
    to,
    subject: "Password Reset Request",
    html: `
      <h2>Reset Your Password</h2>
      <p>Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in  5 minutes.</p>
    `
  });
};
