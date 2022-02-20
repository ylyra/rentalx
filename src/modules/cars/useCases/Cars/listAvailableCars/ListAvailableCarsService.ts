import { inject, injectable } from "tsyringe";

import { Car } from "../../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../../../repositories/Cars/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest): Promise<Car[]> {
    const cars: Car[] = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name
    );
    return cars;
  }
}

export { ListAvailableCarsService };
