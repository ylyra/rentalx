import { CarsRepositoryInMemory } from "../../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsService } from "./ListAvailableCarsService";

let carsRepository: CarsRepositoryInMemory;
let listCarsService: ListAvailableCarsService;

describe("List cars", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    listCarsService = new ListAvailableCarsService(carsRepository);
  });

  it("should be able to list all availabe cars", async () => {
    const car = await carsRepository.create({
      name: "Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listCarsService.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availabe cars by brand", async () => {
    await carsRepository.create({
      name: "Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABB-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "categoryy",
    });
    const car = await carsRepository.create({
      name: "Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand_Test",
      category_id: "category",
    });

    const cars = await listCarsService.execute({
      brand: "Brand_Test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availabe cars by name", async () => {
    await carsRepository.create({
      name: "Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABB-1234",
      fine_amount: 10,
      brand: "Brand_Test",
      category_id: "category",
    });
    const car = await carsRepository.create({
      name: "Car 3",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand_Test",
      category_id: "category",
    });

    const cars = await listCarsService.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all availabe cars by category id", async () => {
    await carsRepository.create({
      name: "Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABB-1234",
      fine_amount: 10,
      brand: "Brand_Test",
      category_id: "categoryy",
    });
    const car = await carsRepository.create({
      name: "Car 3",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand_Test",
      category_id: "category",
    });

    const cars = await listCarsService.execute({
      name: "Car 3",
    });

    expect(cars).toEqual([car]);
  });
});
