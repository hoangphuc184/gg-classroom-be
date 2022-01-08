const db = require("../models");
const excel = require("exceljs");
const { assignments } = require("../models");
const User = db.users;
const Assignment = db.assignments;
const Grade = db.grades;

exports.createGradeOfAssignment = async (inputGrade) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputGrade.grade ||
        !inputGrade.assignmentId ||
        !inputGrade.studentId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required params",
        });
      }
      let student = await User.findOne({
        where: { id: inputGrade.studentId },
      });
      if (!student) {
        resolve({
          errCode: 2,
          errMessage: `Student with ID = ${inputGrade.studentId} does not exist`,
        });
      }
      let assignment = await Assignment.findOne({
        where: { id: inputGrade.assignmentId },
      });
      if (!assignment) {
        resolve({
          errCode: 2,
          errMessage: `Assignment with id = ${inputGrade.assignmentId} does not exist`,
        });
      }
      if (inputGrade.grade > assignment.point) {
        resolve({
          errCode: 2,
          errMessage:
            "Input grade cannot bigger than default point of assignment",
        });
      }
      let gradeRes = await Grade.create(inputGrade);
      resolve({
        errCode: 0,
        data: gradeRes,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.findAll = async () => {
  return await Grade.findAll({
    attributes: ["id", "grade", "assignment_id", "student_id"],
  });
};
