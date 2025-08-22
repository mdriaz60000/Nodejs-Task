import express, { Application, Request, Response } from "express";
import config from "./app/config";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


const app: Application = express();

// parsers
app.use(express.json());

app.use("/api/v1", router);


app.get("/", (req: Request, res: Response) => {
  res.send(`Server Running on port ${config.port}`);
});

app.use(globalErrorHandler)
app.use(notFound);

export default app;