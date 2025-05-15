import express from 'express';
import path from 'path';
import { fileURLToPath } from "url";
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDatabase from "./src/database.js";
import bookRoutes from './src/routes/bookRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import passwordRoutes from "./src/routes/passwordRoutes.js";
import wishlistRoutes from "./src/routes/wishlistRoutes.js";


const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
// Connect to the database
const startServer = async () => {
  try {
    await connectDatabase(); // Ensure the database is connected
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};
startServer();

app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));
app.use("/images", express.static("frontend/images"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json());
app.use("/books", bookRoutes);
app.use("/users",userRoutes);
app.use("/wishlist", wishlistRoutes);
app.use("/api", passwordRoutes);


