import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../config/db.mjs";
import router from "../routes/index.mjs";
import cookieParser from "cookie-parser";

// Load .env in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

// CORS config: allow only your frontend URL + credentials
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
});

export default app;
