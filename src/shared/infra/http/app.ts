import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import "../../container";

import swaggerSetup from "../../../swagger.json";
import errorHandler from "../../errors/handler";
import createConnection from "../typeorm";
import { router } from "./routes/index.routes";

createConnection();
const app = express();
const port = 3333 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/api/v1", router);

app.use(errorHandler);

export { app, port };
