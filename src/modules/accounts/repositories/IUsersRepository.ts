import { User } from "../entities/User";

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driver_license: string;
}

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
}

export { IUsersRepository, ICreateUserDTO };
