import type { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsService } from "./ListAvailableCarsService";

interface IQuery {
  brand?: string;
  category_id?: string;
  name?: string;
}

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, category_id, name } = req.query as IQuery;
    const listAvailableCarsService = container.resolve(
      ListAvailableCarsService
    );

    const cars = await listAvailableCarsService.execute({
      brand,
      category_id,
      name,
    });

    return res.json(cars);
  }
}

export { ListAvailableCarsController };
