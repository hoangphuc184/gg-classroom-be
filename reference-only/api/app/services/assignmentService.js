const db = require("../models");
const Assignment = db.assignments;
const Class = db.classes;

exports.createAssignment = async (infor) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Class.findByPk(infor.classId).then(async (cls) => {
        if (!cls) {
          resolve({
            errCode: 1,
            errMessage: "Class is not found",
          });
        } else {
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
                Class.findByPk(infor.classId).then((clss) => {
                  if (cls) {
                    assignment.setClass(clss);
                    resolve({
                      errCode: 0,
                      errMessage: "Assignment is created",
                    });
                  }
                });
              }
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.findAllAssignmentWithClassId = async (c_id) => {
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

exports.deleteAssignmentOfClass = async (id, c_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let assignment = Assignment.findOne({
        where: {
          id: id,
          classId: c_id,
        },
      });
      if (!assignment) {
        resolve({
          errCode: 1,
          errMessage: "Assignment does not exist!",
        });
      } else {
        await Assignment.destroy({
          where: {
            id: id,
            classId: c_id,
          },
        });
        resolve({
          errCode: 0,
          errMessage: "Assignment is deleted!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

exports.updateAssignment = (c_id, infor) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!infor.assignmentTitle || !infor.point) {
        resolve({
          errCode: 1,
          errMessage: "Missing required information to update assignment!",
        });
      } else {
        await Assignment.update(
          {
            assignmentTitle: infor.assignmentTitle,
            point: infor.point,
          },
          {
            where: {
              id: c_id,
            },
          }
        ).then(() => {
          resolve({
            errCode: 0,
            errMessage: "Assignment is updated",
          });
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
