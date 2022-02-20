import { Router } from "express";

import { CreateCarController } from "../../../../modules/cars/useCases/Cars/createCar/CreateCarController";
import { CreateCarSpecificationController } from "../../../../modules/cars/useCases/Cars/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "../../../../modules/cars/useCases/Cars/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "../../../../modules/cars/useCases/Cars/uploadImageCar/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.get("/", listAvailableCarsController.handle);
carsRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);
carsRoutes.put(
  "/:car_id/specifications",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);
carsRoutes.put(
  "/:car_id/images",
  ensureAuthenticated,
  ensureAdmin,
  uploadCarImageController.handle
);

export { carsRoutes };
