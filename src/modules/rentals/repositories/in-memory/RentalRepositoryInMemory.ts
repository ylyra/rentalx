import { Rental } from "../../infra/typeorm/entities/Rental";
import { ICreateRentalDTO, IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  rentals: Rental[] = [];

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null
    );

    return rental;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const rental = this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null
    );

    return rental;
  }

  async create({
    car_id,
    user_id,
    start_date,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    Object.assign(rental, {
      car_id,
      user_id,
      start_date,
      end_date: null,
      expected_return_date,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
}

export { RentalRepositoryInMemory };
