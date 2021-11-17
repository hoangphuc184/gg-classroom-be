const db = require("../models");
const User = db.users;
const Class = db.classes;

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
