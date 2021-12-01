const gradeService = require("../services/gradeService");
const db = require("../models");
const excel = require("exceljs");
const User = db.users;
const Grade = db.grades;
exports.create = async (req, res) => {
  try {
    const grade = {
      grade: req.body.grade,
      assignment_id: req.body.assignment_id,
      student_id: req.body.student_id,
    };
    const gradeRes = await gradeService.create(grade);
    res.status(200).json(gradeRes);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const grades = await gradeService.findAll();
    if (grades) {
      res.status(200).json(grades);
    } else {
      res.status(404).json({ message: "No users were found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.downAll = (req, res) => {
  try {
    Grade.findAll().then((obj) => {
      let grades_ = [];

      obj.forEach((element) => {
        grades_.push({
          id: element.id,
          grade: element.grade,
          assignment_id: element.assignment_id,
          student_id: element.student_id,
        });
      });

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Grades");

      worksheet.columns = [
        { header: "Id", key: "id", width: 5 },
        { header: "Grade", key: "grade", width: 5 },
        { header: "Assignment ID", key: "assignment_id", width: 10 },
        { header: "Student ID", key: "student_id", width: 10 },
      ];

      worksheet.addRows(grades_);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "grades.xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    });
  } catch (err) {
    console.log(err);
  }
};
