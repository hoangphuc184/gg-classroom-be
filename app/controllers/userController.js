const userService = require("../services/userService");
const db = require("../models");
const User = db.users;
const Class = db.classes;
const Role = db.roles;
const UploadUser = db.uploadusers;
const excel = require("exceljs");

const readXlsxFile = require("read-excel-file/node");

exports.upload = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path = __basedir + "/app/resources/uploads/" + req.file.filename;
    readXlsxFile(path).then((rows) => {
      // skip header
      rows.shift();

      let students = [];

      rows.forEach((row) => {
        let std = {
          id: row[0],
          studentID: row[1],
          fullName: row[2],
          accountLinkTo: row[3],
        };

        students.push(std);
      });

      UploadUser.bulkCreate(students)
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

exports.update = async (req, res) => {
  try {
    const Users = await userService.update(req.params.id, req.body);
    if (Users) {
      res.status(200).json({ message: "User updated" });
    } else {
      res.status(404).json({ message: "Error updating user" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await userService.findAll();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: "No users were found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findAllTeacherOfClass = async (req, res) => {
  try {
    let teachers = await userService.findAllTeacherOfClass(req.query.c_id);
    res.status(200).json(teachers);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.findAllStudentOfClass = async (req, res) => {
  try {
    let students = await userService.findAllStudentOfClass(req.query.c_id);
    res.status(200).json(students);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.findForProfile = async (req, res) => {
  try {
    let user = await userService.findForProfile(req.params.userId);
    res.status(200).json(user);
  } catch (e) {
    console(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.downloadAllStudentOfClass = (req, res) => {
  try {
    const c_id = req.query.c_id;
    User.findAll({
      attributes: ["id", "fullName"],
      include: [
        {
          model: Role,
          attributes: ["name"],
          where: {
            name: "student",
          },
          through: {
            attributes: [],
          },
        },
        {
          model: Class,
          attributes: [],
          where: {
            id: c_id,
          },
          through: {
            attributes: [],
          },
        },
      ],
      raw: true,
      nest: true,
    }).then((obj) => {
      console.log(obj);
      let grades_ = [];

      obj.forEach((element) => {
        grades_.push({
          id: element.id,
          fullName: element.fullName,
        });
      });

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Grades");

      worksheet.columns = [
        { header: "Id", key: "id", width: 5 },
        { header: "Full name", key: "fullName", width: 30 },
      ];

      worksheet.addRows(grades_);

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "students.xlsx"
      );

      return workbook.xlsx.write(res).then(function () {
        res.status(200).end();
      });
    });
  } catch (err) {
    console.log(err);
  }
};
