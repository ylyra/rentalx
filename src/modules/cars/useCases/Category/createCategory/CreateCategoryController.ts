import { Request, Response } from "express";

import { CreateCategoryService } from "./CreateCategoryService";

class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}

  handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const category = this.createCategoryService.execute({ name, description });

    return res.status(201).json(category);
  }
}

export { CreateCategoryController };
