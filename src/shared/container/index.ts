import { container } from "tsyringe";

import { CategoriesRepository } from "../../modules/cars/repositories/Category/CategoriesRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/Category/ICategoriesRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/Specification/ISpecificationRepository";
import { SpecificationRepository } from "../../modules/cars/repositories/Specification/SpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);
