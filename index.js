import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import favouritesRouter from "./routes/favourites.routes.js";

dotenv.config();

const { PORT } = process.env;
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Traverse App backend API.");
});

app.use("/auth", authRouter);
app.use("/favourites", favouritesRouter);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
