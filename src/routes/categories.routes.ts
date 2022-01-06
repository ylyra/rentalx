import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categories = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const category = categories.create({ name, description });

  return res.status(201).json(category);
});

export { categoriesRoutes };
