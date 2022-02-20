import { Connection, createConnections } from "typeorm";

let connectionInstance: Connection;

export async function createConnection(): Promise<void> {
  if (connectionInstance) {
    throw new Error("Connection already created");
  }

  const [connection] = await createConnections();

  connectionInstance = connection;
}

export async function getConnection(): Promise<Connection> {
  if (!connectionInstance) {
    throw new Error("Connection not set");
  }

  return connectionInstance;
}
