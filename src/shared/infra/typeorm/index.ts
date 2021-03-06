import { Connection, createConnection, getConnectionOptions } from "typeorm";

// host = "database_rentalx"
export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === "test"
          ? process.env.TYPEORM_DATABASE_TEST
          : defaultOptions.database,
    })
  );
};
