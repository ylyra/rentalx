import dayjs from "dayjs";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../../accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../../accounts/repositories/IUsersRepository";
import { ICarsRepository } from "../../../cars/repositories/Cars/ICarsRepository";
import { CarsRepositoryInMemory } from "../../../cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalRepositoryInMemory } from "../../repositories/in-memory/RentalRepositoryInMemory";
import { IRentalRepository } from "../../repositories/IRentalRepository";
import { CreateRentalService } from "./CreateRentalService";

let createRentalService: CreateRentalService;
let rentalRepositoryInMemory: IRentalRepository;
let carsRepositoryInMemory: ICarsRepository;
let usersRepositoryInMemory: IUsersRepository;
let dateProvider: IDateProvider;
describe("Create Rental", () => {
  const expectedReturnDate = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();

    createRentalService = new CreateRentalService(
      rentalRepositoryInMemory,
      carsRepositoryInMemory,
      usersRepositoryInMemory,
      dateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Yan",
      email: "yan@lyra.souza",
      password: "123",
      driver_license: "000123",
    });

    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    const rental = await createRentalService.execute({
      car_id: car.id,
      user_id: user.id,
      start_date: dayjs().toDate(),
      expected_return_date: expectedReturnDate,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should be not be able to create a new rental if car already is rented", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Yan",
      email: "yan@lyra.souza",
      password: "123",
      driver_license: "000123",
    });
    const user2 = await usersRepositoryInMemory.create({
      name: "Yan 1",
      email: "yan1@lyra.souza",
      password: "123",
      driver_license: "000123",
    });

    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    await createRentalService.execute({
      car_id: car.id,
      user_id: user.id,
      start_date: dayjs().toDate(),
      expected_return_date: expectedReturnDate,
    });

    expect(async () => {
      await createRentalService.execute({
        car_id: car.id,
        user_id: user2.id,
        start_date: dayjs().toDate(),
        expected_return_date: expectedReturnDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not be able to create a new rental if user already is renting a car", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Yan",
      email: "yan@lyra.souza",
      password: "123",
      driver_license: "000123",
    });

    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "name car 2",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-4567",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    expect(async () => {
      await createRentalService.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: dayjs().toDate(),
        expected_return_date: expectedReturnDate,
      });

      await createRentalService.execute({
        car_id: car2.id,
        user_id: user.id,
        start_date: dayjs().toDate(),
        expected_return_date: expectedReturnDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not be able to rent a car that does not exists", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Yan",
      email: "yan@lyra.souza",
      password: "123",
      driver_license: "000123",
    });
    expect(async () => {
      await createRentalService.execute({
        car_id: "123456",
        user_id: user.id,
        start_date: dayjs().toDate(),
        expected_return_date: expectedReturnDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not be able to rent a car if user does not exists", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    expect(async () => {
      await createRentalService.execute({
        car_id: car.id,
        user_id: "123456",
        start_date: dayjs().toDate(),
        expected_return_date: expectedReturnDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not be able to rent a car if start day is higher then expected end", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Yan",
      email: "yan@lyra.souza",
      password: "123",
      driver_license: "000123",
    });

    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    expect(async () => {
      await createRentalService.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: dayjs().add(2, "day").toDate(),
        expected_return_date: expectedReturnDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be not be able to rent a car if rent time is less then 24 hours", async () => {
    const user = await usersRepositoryInMemory.create({
      name: "Yan",
      email: "yan@lyra.souza",
      password: "123",
      driver_license: "000123",
    });

    const car = await carsRepositoryInMemory.create({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    expect(async () => {
      await createRentalService.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: dayjs().add(4, "hour").toDate(),
        expected_return_date: expectedReturnDate,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
