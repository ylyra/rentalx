import { SpecificationRepository } from "../../../repositories/Specification/SpecificationRepository";
import { CreateSpecificationController } from "./CreateSpecificationController";
import { CreateSpecificationService } from "./CreateSpecificationService";

const specificationRepository = SpecificationRepository.getInstance();
const createSpecificationService = new CreateSpecificationService(
  specificationRepository
);

// Controller initiation
const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

export { createSpecificationController };
