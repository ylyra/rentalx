import { Request, Response } from "express";

import { ImportCategoryService } from "./ImportCategoryService";

class ImportCategoryController {
  constructor(private importCategoryService: ImportCategoryService) {}

  handle(req: Request, res: Response) {
    const { file } = req;

    this.importCategoryService.execute(file);

    return res.send();
  }
}

export { ImportCategoryController };
