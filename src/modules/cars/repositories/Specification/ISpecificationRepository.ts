import { Specification } from "../../model/Specification";

// DTO => Data transfer object
export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Specification;
  list(): Specification[];
  create({ name, description }: ICreateSpecificationDTO): Specification;
}

export { ISpecificationRepository };