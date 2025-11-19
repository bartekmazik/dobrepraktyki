import { Router } from "express";
import { getRatings } from "../controllers/movies/ratingsController";
const ratingRouter = Router();

ratingRouter.get("/", getRatings);

export default ratingRouter;
