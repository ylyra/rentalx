import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import { app } from "../../../../../shared/infra/http/app";
import createConnection from "../../../../../shared/infra/typeorm";

let connection: Connection;
describe("Create Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidv4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users (
      id, 
      name, 
      email, 
      password, 
      driver_license, 
      "isAdmin", 
      created_at
    ) values (
      '${id}', 
      'admin', 
      'admin@rentalx.com.br', 
      '${password}', 
      'driver_license', 
      true, 
      NOW()
    )`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a category", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "admin@rentalx.com.br",
      password: "admin",
    });

    const { token } = responseToken.body;
    const response = await request(app)
      .post("/api/v1/categories")
      .send({
        name: "Teste de Categoria",
        description: "Teste de Categoria Descrição",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });
});
