const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    logging: false,
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//User -> Payment ( User belongs to Payment)
db.User = require("./user")(sequelize, Sequelize);
db.Bike = require("./bike")(sequelize, Sequelize);
db.Location = require("./location")(sequelize, Sequelize);
db.Service = require("./service")(sequelize, Sequelize);
db.Comment = require("./comments")(sequelize, Sequelize);

db.Location.hasMany(db.Service);
db.Service.hasMany(db.Bike);
db.User.hasMany(db.Comment);
db.Bike.hasMany(db.Comment);

module.exports = db;
