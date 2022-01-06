const db = require("../models");
const User = db.users;
const Class = db.classes;
const Role = db.roles;

exports.create = async (user) => {
  // Save User in the database
  const result = await User.create(user);
  return result;
};

exports.findAll = async () => {
  return await User.findAll({
    attributes: ["id", "studentID", "fullName", "DOB", "email", "phoneNumber"],
    include: [
      {
        model: Class,
        attributes: ["id", "className"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

exports.findAllTeacherOfClass = async (c_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cls = await Class.findByPk(c_id);
      if (!cls) {
        resolve({
          errCode: 1,
          errMessage: "Class does not exist",
        });
      } else {
        let teachers = await User.findAll({
          attributes: ["id", "username", "fullName"],
          include: [
            {
              model: Role,
              attributes: ["name"],
              where: {
                name: "teacher",
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
        });
        console.log(teachers);
        resolve({
          errCode: 0,
          data: teachers,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.findAllStudentOfClass = async (c_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cls = await Class.findByPk(c_id);
      if (!cls) {
        resolve({
          errCode: 1,
          errMessage: "Class does not exist",
        });
      } else {
        let students = await User.findAll({
          attributes: ["id", "username", "fullName"],
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
        });
        console.log(students);
        resolve({
          errCode: 0,
          data: students,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.update = async (id, body) => {
  return await User.update(body, { where: { id: id } });
};

exports.findForLogin = async (obj) => {
  return await User.findOne({
    where: {
      username: obj.username,
      password: obj.password,
    },
  });
};

exports.findForProfile = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing user ID",
        });
      } else {
        let user = await User.findOne({
          attributes: [
            "id",
            "studentID",
            "fullName",
            "DOB",
            "email",
            "phoneNumber",
          ],
          where: {
            id: userId,
          },
          raw: true,
        });
        resolve({
          errCode: 0,
          data: user,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
