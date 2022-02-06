import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarService } from "./CreateCarService";

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    } = req.body;

    const createCarService = container.resolve(CreateCarService);
    const car = await createCarService.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
