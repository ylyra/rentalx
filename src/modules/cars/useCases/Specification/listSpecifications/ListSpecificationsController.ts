import { Request, Response } from "express";

import { ListSpecificationsService } from "./ListSpecificationsService";

class ListSpecificationsController {
  constructor(private listSpecificationsService: ListSpecificationsService) {}

  handle(req: Request, res: Response): Response {
    const specifications = this.listSpecificationsService.execute();

    return res.json(specifications);
  }
}

export { ListSpecificationsController };
