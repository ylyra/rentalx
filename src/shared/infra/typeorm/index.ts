import { Connection, createConnection, getConnectionOptions } from "typeorm";

// host = "database_rentalx"
export default async (host = "database_rentalx"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test"
          ? process.env.TYPEORM_DATABASE_TEST
          : defaultOptions.database,
    })
  );
};
