import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalService } from "./CreateRentalService";

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { expected_return_date, car_id, start_date } = req.body;
    const { id: user_id } = req.user;

    const createRentalService = container.resolve(CreateRentalService);

    const rental = await createRentalService.execute({
      car_id,
      expected_return_date,
      start_date,
      user_id,
    });

    return res.status(201).json(rental);
  }
}

export { CreateRentalController };
