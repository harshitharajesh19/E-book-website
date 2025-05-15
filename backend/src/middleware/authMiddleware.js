import jwt from "jsonwebtoken";
import { User } from "../entities/User.js";
import connectDatabase from "../database.js";

const dataSource = await connectDatabase();

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Extract token from header
        if (!token) {
            return res.status(401).json({ message: "Unauthorized! No token provided." });
        }

        const decoded = jwt.verify(token, "11090708"); // Replace with actual secret key
        const user = await dataSource.getRepository(User).findOne({
            where: { id: decoded.id }, // Get user by ID from token
        });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        req.user = user; // Attach user object to request
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token!" });
    }
};

export default authenticateUser;
