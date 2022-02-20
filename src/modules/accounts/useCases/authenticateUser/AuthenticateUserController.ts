import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserService } from "./AuthenticateUserService";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const authenticationInfo = await authenticateUserService.execute({
      email,
      password,
    });

    return res.json(authenticationInfo);
  }
}

export { AuthenticateUserController };
