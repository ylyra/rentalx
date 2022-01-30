import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";

import "../typeorm";
import "../../container";

import swaggerSetup from "../../../swagger.json";
import errorHandler from "../../errors/handler";
import { router } from "./routes/index.routes";

const app = express();
const port = 3333 || process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/api/v1", router);

app.use(errorHandler);

app.listen(port, () => console.log(`server is running on port ${port}`));
