import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

interface IFindByEmailOrDriverLicense {
  email: string;
  driver_license: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmailOrDriverLicense({
    email,
    driver_license,
  }: IFindByEmailOrDriverLicense): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO, IFindByEmailOrDriverLicense };
