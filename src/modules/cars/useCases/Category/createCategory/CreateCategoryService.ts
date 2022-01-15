import { inject, injectable } from "tsyringe";

import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/Category/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("Category already exists!");
    }

    const category = await this.categoriesRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateCategoryService };
