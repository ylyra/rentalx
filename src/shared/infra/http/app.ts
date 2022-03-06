import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
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
import rateLimiter from "./middlewares/rateLimiter";
import { router } from "./routes/index.routes";

createConnection();
const app = express();
const port = process.env.DEV_PORT || process.env.PORT;

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(rateLimiter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));
app.use("/api/v1", router);

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

export { app, port };
