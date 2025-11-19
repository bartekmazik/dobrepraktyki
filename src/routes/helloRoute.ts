import { Router } from "express";
import { getHelloWorld } from "../controllers/movies/helloController";

const helloRouter = Router();

helloRouter.get("/", getHelloWorld);

export default helloRouter;
