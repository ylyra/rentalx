module.exports = {
  type: "postgres",
  port: process.env.TYPEORM_PORT,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.NODE_ENV
    ? process.env.TYPEORM_DATABASE_TEST
    : process.env.TYPEORM_DATABASE,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  seeds: ["./src/shared/infra/typeorm/seeds/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations/",
  },
  syncrhonize: true,
};
