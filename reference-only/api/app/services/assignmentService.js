const db = require("../models");
const Assignment = db.assignments;
const Class = db.classes;

exports.createAssignment = (infor) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !infor.assignmentTitle ||
        !infor.point ||
        !infor.dueDate ||
        !infor.classId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required information to create assignment!",
        });
      } else {
        await Assignment.create({
          assignmentTitle: infor.assignmentTitle,
          instruction: infor.instruction,
          point: infor.point,
          dueDate: infor.dueDate,
        }).then((assignment) => {
          if (infor.classId) {
            Class.findByPk(infor.classId).then((cls) => {
              assignment.setClass(cls);
              resolve({
                errCode: 0,
                errMessage: "Assignment is created",
              });
            });
          }
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.findAllAssignmentWithClassId = (c_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!c_id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required information to find assignments",
        });
      } else {
        let assignments = await Assignment.findAll({
          where: {
            classId: c_id,
          },
        });
        resolve({
          errCode: 0,
          data: assignments,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
