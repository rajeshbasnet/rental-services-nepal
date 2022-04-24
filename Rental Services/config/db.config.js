const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
const host = process.env.HOST;
const dialect = "mysql";
const dbConfig = {
  username,
  password,
  database,
  host,
  dialect,
};

module.exports = dbConfig;
