import { Router } from "express";

import { CategoriesRepository } from "../repositories/Category/CategoriesRepository";
import { CreateCategoryService } from "../services/Category/CreateCategoryService";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();
  res.json(all);
});

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);
  const category = createCategoryService.execute({ name, description });

  return res.status(201).json(category);
});

export { categoriesRoutes };
