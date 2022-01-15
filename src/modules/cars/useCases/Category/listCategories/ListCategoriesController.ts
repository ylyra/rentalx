import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryService } from "./ListCategoryService";

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoryService = container.resolve(ListCategoryService);
    const categories = await listCategoryService.execute();

    return res.json(categories);
  }
}

export { ListCategoriesController };
