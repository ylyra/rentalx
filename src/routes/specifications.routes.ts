import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/Specification/createSpecification/CreateSpecificationController";
import { ListSpecificationsController } from "../modules/cars/useCases/Specification/listSpecifications/ListSpecificationsController";

const specificationsRoutes = Router();

const listSpecificationsController = new ListSpecificationsController();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.get("/", listSpecificationsController.handle);
specificationsRoutes.post("/", createSpecificationController.handle);

export { specificationsRoutes };
