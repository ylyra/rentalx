import { User } from "../infra/typeorm/entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
  id?: string;
  avatar?: string;
}

interface IFindByEmailOrDriverLicense {
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByEmailOrDriverLicense({
    email,
    driver_license,
  }: IFindByEmailOrDriverLicense): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO, IFindByEmailOrDriverLicense };
