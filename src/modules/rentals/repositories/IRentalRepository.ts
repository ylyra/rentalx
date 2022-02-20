import { Rental } from "../infra/typeorm/entities/Rental";

interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  start_date: Date;
  expected_return_date: Date;
}

interface IRentalRepository {
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalRepository, ICreateRentalDTO };
