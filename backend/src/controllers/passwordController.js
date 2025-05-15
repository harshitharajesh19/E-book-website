import crypto from "crypto";
import bcrypt from "bcrypt";
import connectDatabase from "../database.js";
import { User } from "../entities/User.js";
import { PasswordReset } from "../entities/PasswordReset.js";
import { sendResetEmail } from "../utils/mailer.js";

const dataSource = await connectDatabase();
const userRepository = dataSource.getRepository(User);
const resetRepository = dataSource.getRepository(PasswordReset);

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Find the user by email
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Generate a secure token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // 3. Save token and expiry to DB
    await resetRepository.save({
      token,
      expires_at: expiresAt,
      user: user,
    });

    // 4. Send the email with reset link
    const resetLink = `http://localhost:3000/reset-password.html?token=${token}`;
    await sendResetEmail(email, resetLink);

    return res.json({ message: "Password reset email sent!" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }

    const resetEntry = await resetRepository.findOne({
      where: { token },
      relations: ["user"],
    });

    if (!resetEntry || new Date() > resetEntry.expires_at) {
      return res.status(400).json({ message: "Token is invalid or has expired" });
    }

    resetEntry.user.password = await bcrypt.hash(newPassword, 10);
    await userRepository.save(resetEntry.user);
    console.log("Password updated for user:", resetEntry.user.id);
    await resetRepository.delete(resetEntry.id); // Delete used token

    return res.status(200).json({ message: "Password has been reset successfully!" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

