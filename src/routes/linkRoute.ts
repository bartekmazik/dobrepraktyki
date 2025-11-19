import { Router } from "express";
import { getLinks } from "../controllers/movies/linksController";

const linkRouter = Router();

linkRouter.get("/", getLinks);

export default linkRouter;
