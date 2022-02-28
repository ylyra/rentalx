import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICarsRepository } from "../../../cars/repositories/Cars/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";

interface IRequest {
  user_id: string;
  car_id: string;
  start_date: Date;
  expected_return_date: Date;
}

@injectable()
class CreateRentalService {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    car_id,
    expected_return_date,
    start_date,
    user_id,
  }: IRequest): Promise<Rental> {
    const car = await this.carsRepository.findById(car_id);
    if (!car) {
      throw new AppError("Car not found");
    }

    if (!car.available) {
      throw new AppError("Car not available");
    }

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError("User not found");
    }

    const userNotAvailable = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );
    if (userNotAvailable) {
      throw new AppError("User cannot rent more than one car");
    }

    const compareHoursMinimum = 24;
    if (this.dateProvider.isAfter(start_date, expected_return_date)) {
      throw new AppError("Start date must be before expected return date");
    }

    const compare = this.dateProvider.compareInHours(
      start_date,
      expected_return_date
    );
    if (compare < compareHoursMinimum) {
      throw new AppError("Expected return date must be at least 24 hours");
    }

    const rental = await this.rentalRepository.create({
      car_id,
      user_id,
      start_date,
      expected_return_date,
    });

    await this.carsRepository.updateAvailabilty(car_id, false);

    return rental;
  }
}

export { CreateRentalService };
