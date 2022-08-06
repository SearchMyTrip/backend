import { addFavourites } from "../controllers/favourites/addFavourites.controller.js";
import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const favouritesRouter = Router();

favouritesRouter.post("/add", authenticateUser, addFavourites);

export default favouritesRouter;
