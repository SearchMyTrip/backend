import { Router } from "express";
import { getMyDetails } from "../controllers/profile/profile.controllers.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const profileRouter = Router();

profileRouter.get("/details", authenticateUser, getMyDetails);

export default profileRouter;
