import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { IUserTokensRepository } from "../../repositories/IUserTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        decode.sub,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refresh_token = sign(
      { email: decode.email },
      auth.secret_refresh_token,
      {
        subject: decode.sub,
        expiresIn: auth.expires_in_refresh_token,
      }
    );
    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    );
    await this.userTokensRepository.create({
      user_id: decode.sub,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    return refresh_token;
  }
}

export { RefreshTokenService };
