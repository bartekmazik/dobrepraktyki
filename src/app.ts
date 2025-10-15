import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { getHelloWorld } from "./controllers/helloController";
import helloRouter from "./routes/helloRoute";
import movieRouter from "./routes/movieRoute";

const app = express();

app.use(express.json());

// Routes
app.use("/api/hello", helloRouter);
app.use("/api/movies", movieRouter);

// err handler
app.use(errorHandler);

export default app;
