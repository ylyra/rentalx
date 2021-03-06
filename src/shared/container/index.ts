import { container } from "tsyringe";

import "./providers";

import { UsersRepository } from "../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UserTokensRepository } from "../../modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";
import { IUserTokensRepository } from "../../modules/accounts/repositories/IUserTokensRepository";
import { CarImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarImagesRepository } from "../../modules/cars/repositories/CarImages/ICarImagesRepository";
import { ICarsRepository } from "../../modules/cars/repositories/Cars/ICarsRepository";
import { ICategoriesRepository } from "../../modules/cars/repositories/Category/ICategoriesRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/Specification/ISpecificationRepository";
import { RentalRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalRepository";
import { IRentalRepository } from "../../modules/rentals/repositories/IRentalRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarImagesRepository>(
  "CarImagesRepository",
  CarImagesRepository
);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);

container.registerSingleton<IUserTokensRepository>(
  "UserTokensRepository",
  UserTokensRepository
);
