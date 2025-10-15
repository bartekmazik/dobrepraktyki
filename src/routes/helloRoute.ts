import { Router } from "express";
import { getHelloWorld } from "../controllers/helloController";

const router = Router();

router.get("/", getHelloWorld);

export default router;
