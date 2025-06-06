import express, { RequestHandler } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./src/config/db";
import userRoutes from "./src/routes/users.routes";
import listRoutes from "./src/routes/lists.routes";
import authRoutes from "./src/routes/auth.routes";
import config from "./src/config/config";
import ErrorHandler from "./src/utils/errorHandler";
import { globalErrorHandler } from "./src/middleware/error.middleware";
import { protect } from "./src/middleware/auth.middleware";

dotenv.config();

const app = express();
const PORT = config.port;

// Connect to DB
dbConnect();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); // routes like /api/auth/register, /api/auth/login etc.
app.use("/api/user", protect as RequestHandler, userRoutes); // routes like /api/user/getProfile, /api/user/update/:user etc.
app.use("/api/list", protect as RequestHandler, listRoutes); // routes like /api/list/create, /api/list/:title etc.

// Check
app.get("/", (_, res) => {
  res.send("Server is running");
});

app.use((req, res, next) => {
  res.status(404).json({
    status: "404",
    message: `${req.originalUrl} does not exist`,
  });
});

// app.all("*", (req, res, next) => {
//   next(new ErrorHandler(`Can't find ${req.originalUrl} on this server!`, 404));
// });

app.use(globalErrorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
