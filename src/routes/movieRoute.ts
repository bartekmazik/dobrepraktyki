import { Router } from "express";
import { getMovies } from "../controllers/movies/movieController";
const movieRouter = Router();

movieRouter.get("/", getMovies);

export default movieRouter;
