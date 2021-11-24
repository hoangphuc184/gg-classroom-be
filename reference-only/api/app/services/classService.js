const db = require("../models");
const Class = db.classes;
const User = db.users;

exports.create = async (_Class) => {
  // Save Class in the database
  const result = await Class.create(_Class);
  return result;
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
    join: [
      {
        model: User,
        where: {
          id: u_id,
        },
      },
    ],
    raw: true,
    nest: true,
  });
};
