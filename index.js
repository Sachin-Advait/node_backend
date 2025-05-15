import express from "express";
import connectMongoDb from "./connection.js";
import path from "path";
import dotenv from "dotenv";
import staticRoute from "./routes/staticRouter.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";
import cookieParser from "cookie-parser";
import { checkForAuthorization, restrictTo } from "./middlewares/auth.js";
dotenv.config();

const app = express();
const PORT = 8000;

const MONGO_URL = process.env.MONGO_URL;

// Connection
connectMongoDb(MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware - plugin
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthorization);

// Routes
app.use("/", staticRoute);
app.use("/api/users", userRoute);
app.use("/api/url", restrictTo(["NORMAL"]), urlRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
