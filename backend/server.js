import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  }),
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/movies", movieRoutes);
app.use("/api/search", searchRoutes);

app.use((err, _req, res, _next) => {
  const status = err.response?.status || err.status || 500;
  const message =
    err.response?.data?.status_message ||
    err.message ||
    "Something went wrong while fetching data from TMDb.";

  res.status(status).json({ message });
});

app.listen(port, () => {
  console.log(`CinemaNova API listening on port ${port}`);
});
