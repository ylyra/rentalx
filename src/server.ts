import express from "express";
import swaggerUi from "swagger-ui-express";

import "./database";
import "./shared/container";

import { router } from "./routes/index.routes";
import swaggerSetup from "./swagger.json";

const app = express();
const port = 3333 || process.env.PORT;

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/api/v1", router);

app.listen(port, () => console.log(`server is running on port ${port}`));
