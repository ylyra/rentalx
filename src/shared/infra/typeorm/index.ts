import { Connection, createConnection, getConnectionOptions } from "typeorm";

let connectionInstance: Connection;

// host = "database_rentalx"
export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  if (!connectionInstance) {
    connectionInstance = await createConnection(
      Object.assign(defaultOptions, {
        database:
          process.env.NODE_ENV === "test"
            ? process.env.TYPEORM_DATABASE_TEST
            : defaultOptions.database,
      })
    );
  }

  return connectionInstance;
};
