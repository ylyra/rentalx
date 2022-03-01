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

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { car_id, end_date: null },
    });
    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { user_id, end_date: null },
    });
    return rental;
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id },
      relations: ["car"],
    });

    return rentals;
  }

  async create({
    car_id,
    user_id,
    start_date,
    expected_return_date,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      start_date,
      expected_return_date,
      end_date,
      id,
      total,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalRepository };
