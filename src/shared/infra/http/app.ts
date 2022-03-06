import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import "../../container";

import upload from "../../../config/upload";
import swaggerSetup from "../../../swagger.json";
import errorHandler from "../../errors/handler";
import createConnection from "../typeorm";
import { router } from "./routes/index.routes";

createConnection();
const app = express();
const port = process.env.DEV_PORT || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use("/api/v1", router);

app.use(errorHandler);

export { app, port };
