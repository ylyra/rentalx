import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenService } from "./RefreshTokenService";

class RefreshTokenController {
  async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    const refreshTokenService = container.resolve(RefreshTokenService);

    const newToken = await refreshTokenService.execute(token);

    return res.json({ newToken });
  }
}

export { RefreshTokenController };
