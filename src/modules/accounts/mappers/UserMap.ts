import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";

interface IUserResponseDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  driver_license: string;
  avatar_url(): string;
}

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });

    return user;
  }
}

export { UserMap, IUserResponseDTO };
