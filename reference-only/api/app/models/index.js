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
db.roles = require("./roleModel.js")(sequelize, Sequelize);

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

db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id"
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id"
});

db.ROLES = ["student", "teacher", "admin"];

module.exports = db;
