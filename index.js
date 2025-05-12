import express from "express";
import connectMongoDb from "./connection.js";

import urlRouter from "./routes/url.js";
import userRouter from "./routes/user.js";

const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/learning_node");

// Middleware - plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRouter);
app.use("/api/url", urlRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
