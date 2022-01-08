import { Request, Response } from "express";

import { CreateSpecificationService } from "./CreateSpecificationService";

class CreateSpecificationController {
  constructor(private createSpecificationService: CreateSpecificationService) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const specification = this.createSpecificationService.execute({
      name,
      description,
    });

    return res.status(201).json(specification);
  }
}

export { CreateSpecificationController };
