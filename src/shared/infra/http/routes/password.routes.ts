import { Router } from "express";

import { ResetUserPasswordController } from "../../../../modules/accounts/useCases/resetUserPassword/ResetUserPasswordController";
import { SendForgotPasswordMailController } from "../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController";

const passwordRouter = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRouter.post("/forgot", sendForgotPasswordMailController.handle);
passwordRouter.post("/reset", resetUserPasswordController.handle);

export { passwordRouter };
