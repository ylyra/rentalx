import { AppError } from "../../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarService } from "./CreateCarService";

let createCarService: CreateCarService;
let carsRepository: CarsRepositoryInMemory;

describe("Create a Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarService = new CreateCarService(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarService.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    expect(car).toHaveProperty("id");
  });

  it("should be able to create a new car with existing license plate", async () => {
    expect(async () => {
      await createCarService.execute({
        name: "name car 1",
        description: "description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "Brand",
        category_id: "category",
      });

      await createCarService.execute({
        name: "name car 2",
        description: "description car",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 10,
        brand: "Brand",
        category_id: "category",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to create a car as available", async () => {
    const car = await createCarService.execute({
      name: "name car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    expect(car.available).toBe(true);
  });
});
