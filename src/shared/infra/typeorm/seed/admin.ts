import { hash } from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection("172.18.0.2");

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

  await connection.close();
}

create().then(() => console.log("User admin created!"));
