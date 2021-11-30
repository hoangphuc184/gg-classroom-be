const db = require("../models");
const Class = db.classes;
const User = db.users;

exports.create = async (classroom) => {
  // Save Class in the database
  return new Promise(async (resolve, reject) => {
    try {
      if (!classroom.className || !classroom.numberOfStudent || ! classroom.banner || !classroom.teacherId) {
        resolve({
          errCode: 1,
          errMessage: "Missing required params to create class"
        })
      }
      let teacher = await User.findOne({
        where: {
          id: classroom.teacherId,
        }
      })
      let createdClass = await Class.create({
        className: classroom.className,
        numberOfStudent: classroom.numberOfStudent,
        banner: classroom.banner,
        teacherName: teacher.fullName
      })
      createdClass.addUser(teacher);
      resolve({
        errCode: 0,
        data: createdClass
      })
    } catch (e) {
      reject(e);
    }
  })
};

exports.findAll = async () => {
  return await Class.findAll({
    include: [
      {
        model: User,
        as: "users",
        attributes: [
          "id",
          "studentID",
          "username",
          "fullName",
          "DOB",
          "email",
          "phoneNumber",
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

exports.findById = async (id) => {
  return await Class.findByPk(id, {
    include: [
      {
        model: User,
        as: "users",
        attributes: [
          "id",
          "studentID",
          "username",
          "fullName",
          "DOB",
          "email",
          "phoneNumber",
        ],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

exports.findByUserId = async (u_id) => {
  return await Class.findAll({
    attributes: ["id", "className"],
    include: [
      {
        model: User,
        attributes: ["id", "username"],
        where: {
          id: u_id,
        },
      },
    ],
    raw: true,
    nest: true,
  });
};
