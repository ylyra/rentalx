import { AppError } from "../../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to created a new category", async () => {
    const category = await createCategoryService.execute({
      name: "Category Teste",
      description: "Category description Test",
    });

    expect(category).toHaveProperty("id");
  });

  it("should not be able to created a new category if name exists", async () => {
    expect(async () => {
      await createCategoryService.execute({
        name: "Category Teste",
        description: "Category description Test",
      });

      await createCategoryService.execute({
        name: "Category Teste",
        description: "Category description Test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
