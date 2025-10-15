import { Router } from "express";
import { getHelloWorld } from "../controllers/helloController";

const helloRouter = Router();

helloRouter.get("/", getHelloWorld);

export default helloRouter;
