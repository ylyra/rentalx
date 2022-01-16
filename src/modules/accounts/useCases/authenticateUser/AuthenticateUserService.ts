import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError("Email or password incorrect!");

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email or password incorrect!");

    const token = sign(
      {},
      "A_-+cyz!SM/I%~MTv.2]N8LMdCFTjR&:8 {EE+yZxzx1Ry.<UWm:Q|Q1XnLBr-@}",
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthenticateUserService };
