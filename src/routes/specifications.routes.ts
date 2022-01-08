import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/Specification/createSpecification";
import { listSpecificationsController } from "../modules/cars/useCases/Specification/listSpecifications";

const specificationsRoutes = Router();

specificationsRoutes.get("/", listSpecificationsController.handle);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
