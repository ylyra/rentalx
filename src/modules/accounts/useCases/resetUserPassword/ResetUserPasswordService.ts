import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

@injectable()
class ResetUserPasswordService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokenRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string, password: string): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exists");
    }

    if (
      !this.dateProvider.isAfter(
        this.dateProvider.dateNow(),
        userToken.expires_date
      )
    ) {
      throw new AppError("Token expired");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User does not exists");
    }

    const passwordHash = await hash(password, 8);
    user.password = passwordHash;

    await this.usersRepository.create(user);
    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetUserPasswordService };
