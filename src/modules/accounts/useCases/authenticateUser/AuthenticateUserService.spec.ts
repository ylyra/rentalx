import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticateUserService } from "./AuthenticateUserService";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserService = new AuthenticateUserService(
      usersRepositoryInMemory
    );
    createUserService = new CreateUserService(usersRepositoryInMemory);
  });

  it("should be able to authenticate a user", async () => {
    const user = await createUserService.execute({
      name: "Yan",
      email: "yan@lyra.souza",
      password: "123",
      driver_license: "000123",
    });

    const result = await authenticateUserService.execute({
      email: user.email,
      password: "123",
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate a non-existent user", () => {
    expect(async () => {
      await authenticateUserService.execute({
        email: "yan@lyra.dev",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate a user with wrong password", () => {
    expect(async () => {
      await createUserService.execute({
        name: "Yan",
        email: "yan@lyra.souza",
        password: "123",
        driver_license: "000123",
      });

      await authenticateUserService.execute({
        email: "yan@lyra.dev",
        password: "1234",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
