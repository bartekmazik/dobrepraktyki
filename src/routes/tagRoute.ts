import { Router } from "express";
import { getTags } from "../controllers/movies/tagsController";
const tagRouter = Router();

tagRouter.get("/", getTags);

export default tagRouter;
