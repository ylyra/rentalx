import { CategoriesRepository } from "../../../repositories/Category/CategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

const categoriesRepository = CategoriesRepository.getInstance();
const createCategoryService = new CreateCategoryService(categoriesRepository);

// Controller initiation
const createCategoryController = new CreateCategoryController(
  createCategoryService
);

export { createCategoryController };
