import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalCarController } from "../../../../modules/rentals/useCases/devolutionRentalCar/DevolutionRentalCarController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalCarController = new DevolutionRentalCarController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.patch(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalCarController.handle
);

export { rentalsRoutes };
