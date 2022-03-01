import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailService } from "./SendForgotPasswordMailService";

class SendForgotPasswordMailController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgotPasswordMail = container.resolve(
      SendForgotPasswordMailService
    );

    await sendForgotPasswordMail.execute(email);

    return res.status(204).send();
  }
}

export { SendForgotPasswordMailController };
