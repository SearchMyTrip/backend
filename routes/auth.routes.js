import { signup, signin } from "../controllers/auth/auth.controller.js";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);

export default authRouter;
