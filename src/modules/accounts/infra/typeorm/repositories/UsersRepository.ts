import { getRepository, Repository } from "typeorm";

import {
  ICreateUserDTO,
  IFindByEmailOrDriverLicense,
  IUsersRepository,
} from "../../../repositories/IUsersRepository";
import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
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
    avatar,
    id,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
