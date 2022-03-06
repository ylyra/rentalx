import { inject, injectable } from "tsyringe";

import { IUserResponseDTO, UserMap } from "../../mappers/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ProfileUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMap.toDTO(user);
  }
}

export { ProfileUserService };
