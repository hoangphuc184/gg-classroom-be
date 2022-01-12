const db = require("../models");
const Class = db.classes;
const User = db.users;
const sendMail = require("../controllers/sendMail");

var jwt = require("jsonwebtoken");

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_KEY, {
    expiresIn: "3d",
  });
};

const { CLIENT_URL } = process.env;

exports.addUser = async (classId, email) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await User.findOne({ where: { email: email } });
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: `User with email = ${email} does not exist`,
        });
      }
      const token = createActivationToken({ classId: classId, email: email });
      const url = `${CLIENT_URL}/verify/class`;
      sendMail(email, url, "Join class", token);
      resolve({
        errCode: 0,
        errMessage: "Invitation link sent!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.joinClass = async (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const payload = jwt.verify(token, process.env.ACTIVATION_KEY);
      let cls = await Class.findOne({ where: { id: payload.classId } });
      if (!cls) {
        resolve({
          errCode: 1,
          errMessage: `Class with id = ${payload.classId} does not exist`,
        });
      }
      let user = await User.findOne({ where: { email: payload.email } });
      if (!user) {
        resolve({
          errCode: 1,
          errMessage: `User with email = ${payload.email} does not exist`,
        });
      }
      cls.addUser(user);
      resolve({
        errCode: 0,
        errMessage: "Joined class",
      });
    } catch (e) {
      reject(e);
    }
  });
};
