import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalCarService } from "./DevolutionRentalCarService";

class DevolutionRentalCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;
    const { id } = req.params;

    const devolutionRentalCarService = container.resolve(
      DevolutionRentalCarService
    );

    const rental = await devolutionRentalCarService.execute({ id, user_id });

    return res.json(rental);
  }
}

export { DevolutionRentalCarController };
