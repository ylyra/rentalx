import { User } from "../../infra/typeorm/entities/User";
import {
  ICreateUserDTO,
  IFindByEmailOrDriverLicense,
  IUsersRepository,
} from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findByEmailOrDriverLicense({
    email,
    driver_license,
  }: IFindByEmailOrDriverLicense): Promise<User> {
    let user = this.users.find((user) => user.email === email);

    if (!user) {
      user = this.users.find((user) => user.driver_license === driver_license);
    }

    return user;
  }
}

export { UsersRepositoryInMemory };
