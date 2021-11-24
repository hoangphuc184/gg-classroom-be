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
    include: [
      {
        model: Class,
        as: "classes",
        attributes: ["id", "className"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

exports.findAllTeacherOfClass = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await User.findAll({
        attributes: ["id", "username"],
        include: [
          {
            model: Role,
            where: {
              name: "teacher",
            },
          },
          { model: Class },
        ],
        raw: true,
        nest: true,
      });
      console.log(teachers);
      resolve(teachers);
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

exports.findById = async (id) => {
  return await User.findByPk(id, {
    include: [
      {
        model: Class,
        as: "classes",
        attributes: ["id", "className"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};
