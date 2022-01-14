import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/Category/createCategory";
import { importCategoryController } from "../modules/cars/useCases/Category/importCategory";
import { listCategoryController } from "../modules/cars/useCases/Category/listCategories";

const categoriesRoutes = Router();
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.get("/", (req, res) =>
  listCategoryController.handle(req, res)
);
categoriesRoutes.post("/", (req, res) =>
  createCategoryController.handle(req, res)
);
categoriesRoutes.post("/import", upload.single("file"), (req, res) =>
  importCategoryController.handle(req, res)
);

export { categoriesRoutes };
