import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { getHelloWorld } from "./controllers/helloController";
import router from "./routes/helloRoute";

const app = express();

app.use(express.json());

// Routes
app.use("/api/hello", router);

// err handler
app.use(errorHandler);

export default app;
