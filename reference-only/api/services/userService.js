const db = require("../models/database");
const users = db.users;

exports.findByObj = async (userObj) => {
  return await users.findOne({
    where: { username: userObj.username, password: userObj.password },
  });
};

exports.create = async (userObj) => {
  const newUser = await users.create(userObj);
  return newUser.id;
};

exports.list = async () => {
  return await users.findAll({ raw: true });
};
