import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectDatabase from "./src/database.js";
import bookRoutes from './src/routes/bookRoutes.js';
import userRoutes from './src/routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;
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
app.use(bodyParser.json());
app.use("/books", bookRoutes);
app.use("/users",userRoutes);



