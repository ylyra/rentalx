import { Router } from "express";

import { CreateRentalController } from "../../../../modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionRentalCarController } from "../../../../modules/rentals/useCases/devolutionRentalCar/DevolutionRentalCarController";
import { ListRentalsByUserController } from "../../../../modules/rentals/useCases/listRentalsbyUser/ListRentalsByUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalCarController = new DevolutionRentalCarController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.patch(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionRentalCarController.handle
);
rentalsRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
