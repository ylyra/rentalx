import { inject, injectable } from "tsyringe";

import { Specification } from "../../../infra/typeorm/entities/Specification";
import { ISpecificationRepository } from "../../../repositories/Specification/ISpecificationRepository";

@injectable()
class ListSpecificationsService {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute(): Promise<Specification[]> {
    const specifications = await this.specificationRepository.list();

    return specifications;
  }
}

export { ListSpecificationsService };
