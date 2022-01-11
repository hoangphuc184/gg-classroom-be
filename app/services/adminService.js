const res = require("express/lib/response");
const db = require("../models");
const User = db.users;
const UploadUser = db.uploadusers;
const Class = db.classes;
const Role = db.roles;

const Op = db.Sequelize.Op;

exports.viewAdminList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let adminList = await User.findAll({
        attributes: [
          "id",
          "username",
          "fullName",
          "DOB",
          "email",
          "phoneNumber",
          "createdAt",
        ],
        include: [
          {
            model: Role,
            attributes: ["name"],
            where: {
              name: "admin",
            },
            through: {
              attributes: [],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: adminList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.searchAdminByNameOrEmail = async (term) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!term) {
        resolve({
          errCode: 1,
          errMessage: "Missing search term",
        });
      }
      let searchAdmins = [];
      if (term.includes("@")) {
        console.log("contain @");
        searchAdmins = await User.findAll({
          attributes: [
            "id",
            "username",
            "fullName",
            "DOB",
            "email",
            "phoneNumber",
            "createdAt",
          ],
          where: {
            email: {
              [Op.like]: `%${term}%`,
            },
          },
          include: [
            {
              model: Role,
              attributes: ["name"],
              where: {
                name: "admin",
              },
              through: {
                attributes: [],
              },
            },
          ],
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        });
      } else {
        searchAdmins = await User.findAll({
          attributes: [
            "id",
            "username",
            "fullName",
            "DOB",
            "email",
            "phoneNumber",
            "createdAt",
          ],
          where: {
            fullName: {
              [Op.like]: `%${term}%`,
            },
          },
          include: [
            {
              model: Role,
              attributes: ["name"],
              where: {
                name: "admin",
              },
              through: {
                attributes: [],
              },
            },
          ],
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        });
      }
      resolve({
        errCode: 0,
        data: searchAdmins,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.viewAdminDetail = async (adminId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!adminId) {
        resolve({
          errCode: 1,
          errMessage: "Missing admin Id",
        });
      }
      let admin = await User.findOne({
        attributes: [
          "id",
          "username",
          "fullName",
          "DOB",
          "email",
          "phoneNumber",
          "createdAt",
        ],
        where: {
          id: adminId,
        },
        include: [
          {
            model: Role,
            attributes: ["name"],
            where: {
              name: "admin",
            },
            through: {
              attributes: [],
            },
          },
        ],
        raw: true,
        nest: true,
      });
      if (admin) {
        resolve({
          errCode: 0,
          data: admin,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `Admin with id = ${adminId} does not exist`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.viewUserList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let userList = await User.findAll({
        include: [
          {
            model: Role,
            attributes: ["name"],
            where: {
              name: {
                [Op.not]: "admin",
              },
            },
            through: {
              attributes: [],
            },
          },
        ],
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: userList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.searchUserByNameOrEmail = async (term) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!term) {
        resolve({
          errCode: 1,
          errMessage: "Missing search term",
        });
      }
      let searchAdmins = [];
      if (term.includes("@")) {
        console.log("contain @");
        searchAdmins = await User.findAll({
          attributes: [
            "id",
            "username",
            "fullName",
            "DOB",
            "email",
            "phoneNumber",
            "createdAt",
          ],
          where: {
            email: {
              [Op.like]: `%${term}%`,
            },
          },
          include: [
            {
              model: Role,
              attributes: ["name"],
              where: {
                name: {
                  [Op.not]: "admin",
                },
              },
              through: {
                attributes: [],
              },
            },
          ],
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        });
      } else {
        searchAdmins = await User.findAll({
          attributes: [
            "id",
            "username",
            "fullName",
            "DOB",
            "email",
            "phoneNumber",
            "createdAt",
          ],
          where: {
            fullName: {
              [Op.like]: `%${term}%`,
            },
          },
          include: [
            {
              model: Role,
              attributes: ["name"],
              where: {
                name: {
                  [Op.not]: "admin",
                },
              },
              through: {
                attributes: [],
              },
            },
          ],
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        });
      }
      resolve({
        errCode: 0,
        data: searchAdmins,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.viewUserDetail = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing user Id",
        });
      }
      let user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Role,
            attributes: ["name"],
            where: {
              name: {
                [Op.not]: "admin",
              },
            },
            through: {
              attributes: [],
            },
          },
        ],
        raw: true,
        nest: true,
      });
      if (user) {
        resolve({
          errCode: 0,
          data: user,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `User with id = ${userId} does not exist or is an Admin`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.banUser = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing user Id",
        });
      }
      let user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Role,
            attributes: ["name"],
            where: {
              name: {
                [Op.not]: "admin",
              },
            },
            through: {
              attributes: [],
            },
          },
        ],
        raw: true,
        nest: true,
      });
      if (user) {
        let destroyedRow = await User.destroy({
          where: {
            id: userId,
          },
        });
        if (destroyedRow == 1) {
          resolve({
            errCode: 0,
            errMessage: `User with id = ${userId} has been banned`,
          });
        }
      } else {
        resolve({
          errCode: 2,
          errMessage: `User with id = ${userId} does not exist or is an Admin`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.viewClassList = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let classList = await Class.findAll();
      resolve({
        errCode: 0,
        data: classList,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.searchClassByName = async (term) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!term) {
        resolve({
          errCode: 1,
          errMessage: "Missing search term",
        });
      }
      let searchClasses = [];
      searchClasses = await Class.findAll({
        attributes: [
          "id",
          "className",
          "teacherName",
          "numberOfStudent",
          "banner",
          "createdAt",
        ],
        where: {
          className: {
            [Op.like]: `%${term}%`,
          },
        },
        order: [["createdAt", "DESC"]],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: searchClasses,
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.viewClassDetail = async (classId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!classId) {
        resolve({
          errCode: 1,
          errMessage: "Missing class IdF",
        });
      }
      let cls = await Class.findOne({
        where: {
          id: classId,
        },
      });
      if (cls) {
        resolve({
          errCode: 0,
          data: cls,
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: `Class with id = ${classId} does not exist`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.manualMappingStudentId = async (userId, cmd) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing user Id",
        });
      }
      let user = await User.findOne({
        where: {
          id: userId,
        },
        include: [
          {
            model: Role,
            attributes: ["name"],
            where: {
              name: {
                [Op.not]: "admin",
              },
            },
            through: {
              attributes: [],
            },
          },
        ],
        raw: true,
        nest: true,
      });
      if (user) {
        if (cmd == 1) {
          // Map Student Id
          await User.update({ isMapped: true }, { where: { id: userId } });
          await UploadUser.update(
            { accountLinkTo: user.email },
            {
              where: {
                studentID: user.studentID,
              },
            }
          );
          resolve({
            errCode: 0,
            errMessage: `Mapped student Id of user with id = ${userId}`,
          });
        }
        if (cmd == 0) {
          // Unmap Student id
          await User.update({ isMapped: false }, { where: { id: userId } });
          await UploadUser.update(
            { accountLinkTo: null },
            {
              where: {
                studentID: user.studentID,
              },
            }
          );
          resolve({
            errCode: 0,
            errMessage: `Unmapped student Id of user with id = ${userId}`,
          });
        }
      } else {
        resolve({
          errCode: 2,
          errMessage: `User with id = ${userId} does not exist or is an Admin`,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
