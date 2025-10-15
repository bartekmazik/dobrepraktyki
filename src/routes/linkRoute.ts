import { Router } from "express";
import { getLinks } from "../controllers/linksController";

const linkRouter = Router();

linkRouter.get("/", getLinks);

export default linkRouter;
