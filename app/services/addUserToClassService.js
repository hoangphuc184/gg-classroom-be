const db = require("../models");
const Class = db.classes;
const User = db.users;

exports.addUser = async (userID, classID) => {
  return Class.findByPk(classID).then((cls) => {
    if (!cls) {
      console.log("Class not found!");
      return null;
    }
    return User.findByPk(userID)
      .then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        cls.addUser(user);
        return cls;
      })
      .catch((err) => {
        console.log(">> Error while adding User to Class: ", err);
      });
  });
};

exports.joinClass = async (classID, username) => {
  return Class.findByPk(classID).then((cls) => {
    if (!cls) {
      console.log("Class not found!");
      return null;
    }
    return User.findOne({ where: { username: username } })
      .then((user) => {
        if (!user) {
          console.log("User not found!");
          return null;
        }

        cls.addUser(user);
        return cls;
      })
      .catch((err) => {
        console.log(">> Error while adding User to Class: ", err);
      });
  });
};
