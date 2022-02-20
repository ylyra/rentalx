import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository, ICreateCarDTO } from "../Cars/ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async findById(car_id: string): Promise<Car> {
    const car = this.cars.find((car) => car.id === car_id);
    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    let cars = this.cars.filter((car) => car.available === true);

    if (brand) {
      cars = cars.filter((car) => car.brand === brand);
    }
    if (category_id) {
      cars = cars.filter((car) => car.category_id === category_id);
    }
    if (name) {
      cars = cars.filter((car) => car.name === name);
    }

    return cars;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications = [],
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
