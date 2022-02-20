import { Router } from "express";

import { CreateSpecificationController } from "../../../../modules/cars/useCases/Specification/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../../../../modules/cars/useCases/Specification/listSpecifications/ListSpecificationsController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.get("/", listSpecificationsController.handle);
specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
);

export { specificationsRoutes };
