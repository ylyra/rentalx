import { Connection, ConnectionManager, getConnectionOptions } from "typeorm";

// host = "database_rentalx"
export default async (): Promise<Connection> => {
  const c = new ConnectionManager();
  let connectionInstance: Connection;

  if (!c.has("default")) {
    const defaultOptions = await getConnectionOptions();
    connectionInstance = c.create(
      Object.assign(defaultOptions, {
        database:
          process.env.NODE_ENV === "test"
            ? process.env.TYPEORM_DATABASE_TEST
            : defaultOptions.database,
      })
    );
  } else {
    connectionInstance = c.get("default");
  }

  return connectionInstance;
};
