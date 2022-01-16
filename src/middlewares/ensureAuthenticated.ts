import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) throw new AppError("Token missing", 401);

  const [, token] = authorization.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "A_-+cyz!SM/I%~MTv.2]N8LMdCFTjR&:8 {EE+yZxzx1Ry.<UWm:Q|Q1XnLBr-@}"
    ) as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exists!", 401);

    // req.user = user;
  } catch {
    throw new AppError("Invalid token", 401);
  }

  next();
}
