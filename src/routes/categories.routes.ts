import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (req, res) => {
  res.json(categoriesRepository.list());
});

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const category = categoriesRepository.create({ name, description });

  return res.status(201).json(category);
});

export { categoriesRoutes };
