const db = require("../models");
const Class = db.classes;
const User = db.users;

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
