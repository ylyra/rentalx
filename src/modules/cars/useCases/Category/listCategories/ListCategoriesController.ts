import { Request, Response } from "express";

import { ListCategoryService } from "./ListCategoryService";

class ListCategoriesController {
  constructor(private listCategoryService: ListCategoryService) {}

  handle(req: Request, res: Response): Response {
    const categories = this.listCategoryService.execute();

    return res.json(categories);
  }
}

export { ListCategoriesController };
