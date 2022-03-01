import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface ICreateUserTokenDTO {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}

interface IUserTokensRepository {
  findByToken(refresh_token: string): Promise<UserTokens>;
  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens>;
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserTokens>;
  deleteById(id: string): Promise<void>;
}

export { IUserTokensRepository, ICreateUserTokenDTO };
