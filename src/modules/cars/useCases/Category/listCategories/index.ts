import { CategoriesRepository } from "../../../repositories/Category/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoryService } from "./ListCategoryService";

const categoriesRepository = CategoriesRepository.getInstance();
const listCategoryService = new ListCategoryService(categoriesRepository);

// Controller initiation
const listCategoryController = new ListCategoriesController(
  listCategoryService
);

export { listCategoryController };
