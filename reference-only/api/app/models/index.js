const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel.js")(sequelize, Sequelize);
db.classes = require("./classModel.js")(sequelize, Sequelize);

db.users.belongsToMany(db.classes, {
  through: "classes_users",
  as: "classes",
  foreignKey: "user_id",
});
db.classes.belongsToMany(db.users, {
  through: "classes_users",
  as: "users",
  foreignKey: "class_id",
});
module.exports = db;
