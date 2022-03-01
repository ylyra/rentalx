import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserServicer } from "./ListRentalsByUserServicer";

class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const listRentalsByUserServicer = container.resolve(
      ListRentalsByUserServicer
    );
    const rentals = await listRentalsByUserServicer.execute(id);

    return res.json(rentals);
  }
}

export { ListRentalsByUserController };
