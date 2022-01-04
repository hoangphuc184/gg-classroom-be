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
db.assignments = require("./assignmentModel.js")(sequelize, Sequelize);
db.grades = require("./gradeModel")(sequelize, Sequelize);
db.uploadusers = require("./uploadUser")(sequelize, Sequelize);

db.users.belongsToMany(db.classes, {
  through: "ClassUser",
  foreignKey: "userId",
  otherKey: "classId",
});
db.classes.belongsToMany(db.users, {
  through: "ClassUser",
  foreignKey: "classId",
  otherKey: "userId",
});

db.roles.belongsToMany(db.users, {
  through: "user_roles",
  foreignKey: "role_id",
  otherKey: "user_id",
});
db.users.belongsToMany(db.roles, {
  through: "user_roles",
  foreignKey: "user_id",
  otherKey: "role_id",
});

db.classes.hasMany(db.assignments, { onDelete: "CASCADE" });
db.assignments.belongsTo(db.classes, { onDelete: "CASCADE" });

db.classes.hasOne(db.uploadusers, { onDelete: "CASCADE" });
db.uploadusers.belongsTo(db.classes, { onDelete: "CASCADE" });

db.assignments.hasOne(db.grades, { onDelete: "CASCADE" });
db.grades.belongsTo(db.assignments, { onDelete: "CASCADE" });

db.ROLES = ["student", "teacher", "admin"];

module.exports = db;
