import express from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/config/db";
import userRoutes from "./src/routes/users.routes";
import listRoutes from "./src/routes/lists.routes";
import config from "./src/config/config";
import { errorHandler } from "./src/middleware/error.middleware";

dotenv.config();

const app = express();
const PORT = config.port;

// Connect to DB
dbConnect();

app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/list", listRoutes);

// Check
app.get("/", (_, res) => {
  res.send("Server is running");
});

//errror handling middleware
// app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
