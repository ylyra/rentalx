import { inject, injectable } from "tsyringe";

import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";

@injectable()
class ListRentalsByUserServicer {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) {}

  async execute(id: string): Promise<Rental[]> {
    const rentals = await this.rentalRepository.findByUser(id);

    return rentals;
  }
}

export { ListRentalsByUserServicer };
