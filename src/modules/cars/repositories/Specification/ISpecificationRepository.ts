import { Specification } from "../../infra/typeorm/entities/Specification";

// DTO => Data transfer object
export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByIds(ids: string[]): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  list(): Promise<Specification[]>;
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification>;
}

export { ISpecificationRepository };
