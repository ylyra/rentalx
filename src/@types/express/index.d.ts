/* eslint-disable @typescript-eslint/naming-convention */
import { User } from "../../modules/accounts/entities/User";

declare namespace Express {
  export interface Request {
    user: User;
  }
}
