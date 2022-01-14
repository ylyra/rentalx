import { parse } from "csv-parse";
import fs from "fs";

import { ICategoriesRepository } from "../../../repositories/Category/ICategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const categoryAlreadyExists = this.categoriesRepository.findByName(
        category.name
      );

      if (!categoryAlreadyExists) {
        this.categoriesRepository.create(category);
      }
    });
  }
}

export { ImportCategoryService };
