import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { getHelloWorld } from "./controllers/helloController";
import helloRouter from "./routes/helloRoute";
import movieRouter from "./routes/movieRoute";
import linkRouter from "./routes/linkRoute";
import { getRatings } from "./controllers/ratingsController";
import { getTags } from "./controllers/tagsController";
import loadData from "./data/loadData";

const app = express();

app.use(express.json());

loadData();

// Routes
app.use("/api/hello", helloRouter);
app.use("/api/movies", movieRouter);
app.use("/api/links", linkRouter);
app.use("/api/ratings", getRatings);
app.use("/api/tags", getTags);

// err handler
app.use(errorHandler);

export default app;
