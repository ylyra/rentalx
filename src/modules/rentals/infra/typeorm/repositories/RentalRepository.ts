import { getRepository, Repository } from "typeorm";

import {
  ICreateRentalDTO,
  IRentalRepository,
} from "../../../repositories/IRentalRepository";
import { Rental } from "../entities/Rental";

class RentalRepository implements IRentalRepository {
  repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ car_id, end_date: null });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({ user_id, end_date: null });
    return rental;
  }

  async create({
    car_id,
    user_id,
    start_date,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      start_date,
      expected_return_date,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalRepository };
