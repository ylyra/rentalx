import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsService } from "./ListSpecificationsService";

class ListSpecificationsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listSpecificationsService = container.resolve(
      ListSpecificationsService
    );
    const specifications = await listSpecificationsService.execute();

    return res.json(specifications);
  }
}

export { ListSpecificationsController };
