module.exports = {
  type: "postgres",
  port: process.env.TYPEORM_PORT,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.NODE_ENV
    ? process.env.TYPEORM_DATABASE_TEST
    : process.env.TYPEORM_DATABASE,
  migrations: ["./dist/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./dist/modules/**/entities/*.ts"],
  seeds: ["./dist/shared/infra/typeorm/seeds/*.ts"],
  cli: {
    migrationsDir: "./dist/shared/infra/typeorm/migrations/",
  },
  syncrhonize: true,
};
