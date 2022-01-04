const db = require("../models");
const Class = db.classes;
const User = db.users;
const UploadUser = db.uploadusers;
const readXlsxFile = require("read-excel-file/node");

exports.create = async (classroom) => {
  // Save Class in the database
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !classroom.className ||
        !classroom.numberOfStudent ||
        !classroom.banner ||
        !classroom.teacherId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required params to create class",
        });
      }
      let teacher = await User.findOne({
        where: {
          id: classroom.teacherId,
        },
      });
      let createdClass = await Class.create({
        className: classroom.className,
        numberOfStudent: classroom.numberOfStudent,
        banner: classroom.banner,
        teacherName: teacher.fullName,
      });
      createdClass.addUser(teacher);
      resolve({
        errCode: 0,
        data: createdClass,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.findAll = async () => {
  return await Class.findAll({
    attributes: ["id", "className", "teacherName", "numberOfStudent", "banner"],
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "studentID", "username", "fullName"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

exports.findById = async (id) => {
  return await Class.findByPk(id, {
    attributes: ["id", "className", "teacherName", "numberOfStudent", "banner"],
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "username", "studentID", "fullName"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

exports.findByUserId = async (u_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!u_id) {
        resolve({
          errCode: 1,
          errMessage: "Missing user ID to find joined class",
        });
      } else {
        let joinedClass = await Class.findAll({
          attributes: [
            "id",
            "className",
            "numberOfStudent",
            "teacherName",
            "banner",
          ],
          include: [
            {
              model: User,
              attributes: [],
              where: {
                id: u_id,
              },
              through: {
                attributes: [],
              },
            },
          ],
          raw: true,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: joinedClass,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.uploadStudentList = async (file, c_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!file || !c_id) {
        resolve({
          errCode: 1,
          errMessage: "Missing params",
        });
      }
      const curClass = await Class.findOne({ where: { id: c_id } });
      if (!curClass) {
        resolve({
          errCode: 2,
          errMessage: "Class does not exist",
        });
      }
      let path = __basedir + "/app/resources/uploads/" + file.filename;
      readXlsxFile(path).then((rows) => {
        // skip header
        rows.shift();

        let studentList = [];

        rows.forEach((row) => {
          let Student = {
            id: row[0],
            studentID: row[1],
            fullName: row[2],
            accountLinkTo: row[3],
            classId: curClass.id,
          };

          studentList.push(Student);
        });

        UploadUser.bulkCreate(studentList)
          .then(() => {
            resolve({
              errCode: 0,
              errMessage: "Upload the file successfully: " + file.originalname,
            });
          })
          .catch((e) => {
            resolve({
              errCode: 3,
              errMessage: "Failed to import data! Error: " + e.message,
            });
          });
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.GetListStudentAndMappingID = async (c_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!c_id) {
        resolve({
          errCode: 1,
          errMessage: "Missing class id",
        });
      }
      let studentList = await UploadUser.findAll({
        attributes: ["id", "studentID", "fullName", "accountLinkTo", "classId"],
        include: [
          {
            model: Class,
            attributes: [],
            where: {
              id: c_id,
            },
          },
        ],
        raw: true,
      });
      for (let i = 0; i < studentList.length; i++) {
        const stud = await User.findOne({
          where: { studentID: studentList[i].studentID },
          raw: true,
        });
        if (stud) {
          studentList[i].accountLinkTo = stud.email;
        }
      }
      resolve({
        errCode: 0,
        data: studentList,
      });
    } catch (e) {
      reject(e);
    }
  });
};
