import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.get("/", (req, res) => {
  const all = categoriesRepository.list();
  res.json(all);
});

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);

  if (categoryAlreadyExists) {
    return res.status(400).json({
      error: "Category already exists.",
    });
  }

  const category = categoriesRepository.create({ name, description });

  return res.status(201).json(category);
});

export { categoriesRoutes };
