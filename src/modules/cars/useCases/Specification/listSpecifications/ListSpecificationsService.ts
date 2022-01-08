import { Specification } from "../../../model/Specification";
import { ISpecificationRepository } from "../../../repositories/Specification/ISpecificationRepository";

class ListSpecificationsService {
  constructor(private specificationRepository: ISpecificationRepository) {}

  execute(): Specification[] {
    const specifications = this.specificationRepository.list();

    return specifications;
  }
}

export { ListSpecificationsService };
