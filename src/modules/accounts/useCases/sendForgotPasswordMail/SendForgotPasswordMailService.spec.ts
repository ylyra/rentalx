import { DayJsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { EtherealMailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/EtherealMailProviderInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UserTokensInMemory } from "../../repositories/in-memory/UserTokensInMemory";
import { SendForgotPasswordMailService } from "./SendForgotPasswordMailService";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensInMemory: UserTokensInMemory;
let dayJsDateProvider: DayJsDateProvider;
let mailProviderInMemory: EtherealMailProviderInMemory;

let sendForgotPasswordMailService: SendForgotPasswordMailService;

describe("Test email send for forgot password", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    userTokensInMemory = new UserTokensInMemory();
    dayJsDateProvider = new DayJsDateProvider();
    mailProviderInMemory = new EtherealMailProviderInMemory();

    sendForgotPasswordMailService = new SendForgotPasswordMailService(
      usersRepositoryInMemory,
      userTokensInMemory,
      dayJsDateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a email for existing user", async () => {
    const sendMail = spyOn(mailProviderInMemory, "sendMail");

    const user = await usersRepositoryInMemory.create({
      name: "John Doe",
      email: "mararobe@li.hu",
      password: "183",
      driver_license: "IjcKp7",
    });

    await sendForgotPasswordMailService.execute(user.email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send a email for a non-existing user", async () => {
    expect(async () => {
      await sendForgotPasswordMailService.execute("iz@negtagpi.wf");
    }).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an new user token", async () => {
    const genereateTokenMail = spyOn(userTokensInMemory, "create");

    const user = await usersRepositoryInMemory.create({
      name: "Clayton Alvarado",
      email: "gavuesu@wa.ml",
      password: "RXM1hPqS2oLC",
      driver_license: "UTnL0wn4",
    });

    await sendForgotPasswordMailService.execute(user.email);

    expect(genereateTokenMail).toHaveBeenCalled();
  });
});
