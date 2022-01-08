import { SpecificationRepository } from "../../../repositories/Specification/SpecificationRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsService } from "./ListSpecificationsService";

const specificationRepository = SpecificationRepository.getInstance();
const listSpecificationsService = new ListSpecificationsService(
  specificationRepository
);

// Controller
const listSpecificationsController = new ListSpecificationsController(
  listSpecificationsService
);

export { listSpecificationsController };
