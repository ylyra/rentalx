import { AppError } from "../../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "../../../repositories/in-memory/SpecificationsRepositoryInMemory";
import { CreateCarSpecificationService } from "./CreateCarSpecificationService";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;
let createCarSpecificationService: CreateCarSpecificationService;

describe("Create car specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationService = new CreateCarSpecificationService(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to the car", async () => {
    expect(async () => {
      await createCarSpecificationService.execute({
        car_id: "1234",
        specifications_id: ["54321"],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car",
      description: "description car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 10,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: "Specification",
      description: "description specification",
    });

    const specificationsCar = await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id: [specification.id],
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications).toHaveLength(1);
  });
});
