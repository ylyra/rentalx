import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordService } from "./ResetUserPasswordService";

class ResetUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query;
    const { password } = req.body;
    const resetUserPasswordService = container.resolve(
      ResetUserPasswordService
    );

    await resetUserPasswordService.execute(String(token), password);

    return res.json({ message: "ok" });
  }
}

export { ResetUserPasswordController };
