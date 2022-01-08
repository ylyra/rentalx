import { Router } from "express";

import { createCategoryController } from "../modules/cars/useCases/Category/createCategory";
import { listCategoryController } from "../modules/cars/useCases/Category/listCategories";

const categoriesRoutes = Router();

categoriesRoutes.get("/", listCategoryController.handle);
categoriesRoutes.post("/", createCategoryController.handle);

export { categoriesRoutes };
