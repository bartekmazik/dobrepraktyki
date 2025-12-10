import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { getHelloWorld } from "./controllers/movies/helloController";
import helloRouter from "./routes/helloRoute";
import movieRouter from "./routes/movieRoute";
import linkRouter from "./routes/linkRoute";
import { getRatings } from "./controllers/movies/ratingsController";
import { getTags } from "./controllers/movies/tagsController";
import loadData from "./data/loadData";
import { loginController } from "./controllers/auth/loginController";
import { authMiddleware } from "./middleware/authMiddleware";
import { usersController } from "./controllers/auth/usersController";
import { userDetailsController } from "./controllers/users/userDetailsController";
import { getPeopleCount } from "./controllers/analyzer/analyzeController";

const app = express();

app.use(express.json());

loadData();

app.use("/api/hello", authMiddleware, helloRouter);
app.use("/api/movies", authMiddleware, movieRouter);
app.use("/api/links", authMiddleware, linkRouter);
app.use("/api/ratings", authMiddleware, getRatings);
app.use("/api/tags", authMiddleware, getTags);
app.post("/api/login", loginController);
app.post("/api/users", authMiddleware, usersController);
app.get("/api/user_details", authMiddleware, userDetailsController);
app.get("/api/get_people_count", getPeopleCount);

app.use(errorHandler);

export default app;
