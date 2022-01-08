const gradeService = require("../services/gradeService");
const db = require("../models");
const excel = require("exceljs");
const User = db.users;
const Grade = db.grades;
const readXlsxFile = require("read-excel-file/node");
const upload = require("../middlewares/upload");
exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path = __basedir + "/app/resources/uploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let grades = [];

      rows.forEach((row) => {
        let grade = {
          grade: row[0],
          studentId: row[1],
          assignmentId: req.query.assignment_id,
        };

        grades.push(grade);
      });

      Grade.bulkCreate(grades)
        .then(() => {
          res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
          });
        })
        .catch((error) => {
          res.status(500).send({
            message: "Fail to import data into database!",
            error: error.message,
          });
        });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};

exports.createGradeOfAssignment = async (req, res) => {
  try {
    const inputGrade = {
      grade: req.body.grade,
      assignmentId: req.body.assignmentId,
      studentId: req.body.studentId,
    };
    const gradeRes = await gradeService.createGradeOfAssignment(inputGrade);
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
