import { inject, injectable } from "tsyringe";

import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/Category/ICategoriesRepository";

@injectable()
class ListCategoryService {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoryService };
