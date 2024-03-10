const { Sequelize } = require("sequelize");

// Initialize Sequelize with your PostgreSQL database connection parameters
const dbConnection = new Sequelize({
  dialect: "postgres",
  database: process.env.DATABASE,
  username: process.env.PSQL_USER,
  password: process.env.PSQL_PW,
  host: "localhost",
  port: 5432,
  logging: false,
});

module.exports = { dbConnection };
