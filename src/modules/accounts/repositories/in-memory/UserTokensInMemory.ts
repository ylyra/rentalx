import { UserTokens } from "../../infra/typeorm/entities/UserTokens";
import {
  ICreateUserTokenDTO,
  IUserTokensRepository,
} from "../IUserTokensRepository";

class UserTokensInMemory implements IUserTokensRepository {
  usersTokens: UserTokens[] = [];

  async findByToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );
    return userToken;
  }

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    this.usersTokens = this.usersTokens.filter(
      (userToken) => userToken.id !== id
    );
  }
}

export { UserTokensInMemory };
