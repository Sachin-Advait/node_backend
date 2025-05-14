import express from "express";
import connectMongoDb from "./connection.js";
import path from "path";

import staticRoute from "./routes/staticRouter.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";

const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/learning_node");

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware - plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", staticRoute);
app.use("/api/users", userRoute);
app.use("/api/url", urlRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
