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

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<ITokenResponse> {
    const decode = verify(token, auth.secret_refresh_token) as IPayload;

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        decode.sub,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    const { refresh_token } = userToken;

    if (
      this.dateProvider.isAfter(
        this.dateProvider.dateNow(),
        userToken.expires_date
      )
    ) {
      await this.userTokensRepository.deleteById(userToken.id);
      throw new AppError("Token expired");
    }

    const newToken = sign({}, auth.secret_token, {
      subject: decode.sub,
      expiresIn: auth.expires_in_token,
    });

    return { refresh_token, token: newToken };
  }
}

export { RefreshTokenService };
