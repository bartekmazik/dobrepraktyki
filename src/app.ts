import express from "express";
import itemRoutes from "./routes/itemRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);

// err handler
app.use(errorHandler);

export default app;
