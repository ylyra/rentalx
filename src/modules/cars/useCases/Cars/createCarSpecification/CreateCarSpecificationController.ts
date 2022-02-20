import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationService } from "./CreateCarSpecificationService";

class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id } = req.params;
    const { specifications_id } = req.body;

    const createCarSpecificationService = container.resolve(
      CreateCarSpecificationService
    );
    const car = await createCarSpecificationService.execute({
      car_id,
      specifications_id,
    });

    return res.json(car);
  }
}

export { CreateCarSpecificationController };
