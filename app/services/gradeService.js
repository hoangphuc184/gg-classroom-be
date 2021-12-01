const db = require("../models");
const excel = require("exceljs");
const User = db.users;
const Grade = db.grades;

exports.create = async (grade) => {
  const result = await Grade.create(grade);
  return result;
};

exports.findAll = async () => {
  return await Grade.findAll({
    attributes: ["id", "grade", "assignment_id", "student_id"],
  });
};
