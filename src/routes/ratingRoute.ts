import { Router } from "express";
import { getRatings } from "../controllers/ratingsController";
const ratingRouter = Router();

ratingRouter.get("/", getRatings);

export default ratingRouter;
