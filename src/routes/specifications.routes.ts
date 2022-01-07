import { Router } from "express";

import { SpecificationRepository } from "../repositories/Specification/SpecificationRepository";
import { CreateSpecificationService } from "../services/Specification/CreateSpecificationService";

const specificationsRoutes = Router();
const specificationRepository = new SpecificationRepository();

specificationsRoutes.get("/", (req, res) => {
  const all = specificationRepository.list();
  res.json(all);
});

specificationsRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );
  const category = createSpecificationService.execute({ name, description });

  return res.status(201).json(category);
});

export { specificationsRoutes };
