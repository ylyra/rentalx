import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../../cars/repositories/Cars/ICarsRepository";
import { Rental } from "../../infra/typeorm/entities/Rental";
import { IRentalRepository } from "../../repositories/IRentalRepository";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalCarService {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    if (!rental) {
      throw new AppError("Rental not found");
    }

    if (rental.user_id !== user_id) {
      throw new AppError("User not authorized");
    }

    // Verificar tempo de aluguel
    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
    const requestedMinDailyLocation = 1;
    if (daily <= 0) {
      daily = requestedMinDailyLocation;
    }

    const delay = this.dateProvider.compareInHours(
      rental.expected_return_date,
      dateNow
    );

    let totalAmountToBeCharged = 0;
    if (delay > 0) {
      const finePerHour = Math.round(car.daily_rate / 24);
      const daysToBeFined = Math.floor(delay / 24);
      const hoursToBeFined = delay % 24;

      const calculateFine =
        daysToBeFined * car.daily_rate + finePerHour * hoursToBeFined;
      totalAmountToBeCharged = calculateFine;
    }

    totalAmountToBeCharged += daily * car.daily_rate;

    rental.end_date = dateNow;
    rental.total = totalAmountToBeCharged;

    await this.rentalRepository.create(rental);
    await this.carsRepository.updateAvailabilty(car.id, true);

    return rental;
  }
}

export { DevolutionRentalCarService };
