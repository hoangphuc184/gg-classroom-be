const db = require("../models/database");
const classes = db.classes;

exports.list = async () => {
  return await classes.findAll({ raw: true });
};

exports.create = async (classObj) => {
  const newClass = await classes.create(classObj);
  return newClass.id;
};
