import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";
import {
  ICreateUserDTO,
  IFindByEmailOrDriverLicense,
  IUsersRepository,
} from "./IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByEmailOrDriverLicense({
    email,
    driver_license,
  }: IFindByEmailOrDriverLicense): Promise<User> {
    const user = await this.repository.findOne({
      where: [{ email }, { driver_license }],
    });

    return user;
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
