const db = require("../models");
const Assignment = db.assignments;
const Class = db.classes;
const Grade = db.grades;

exports.createAssignment = async (infor) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Class.findByPk(infor.classId).then(async (cls) => {
        if (!cls) {
          resolve({
            errCode: 1,
            errMessage: "Class not exist",
          });
        } else {
          if (
            !infor.assignmentTitle ||
            !infor.point ||
            !infor.dueDate ||
            !infor.classId ||
            !infor.scale
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
              scale: infor.scale,
            }).then(async (assignment) => {
              await Class.findByPk(infor.classId).then((clss) => {
                if (cls) {
                  assignment.setClass(clss);
                  resolve({
                    errCode: 0,
                    data: assignment,
                  });
                }
              });
            });
          }
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.findAllAssignment = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let assignments = await Assignment.findAll({
        raw: true,
        order: [["createdAt", "DESC"]],
      });
      resolve({
        errCode: 0,
        data: assignments,
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

exports.findAssignmentWithClassId = async (assignId, c_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!assignId | !c_id) {
        resolve({
          errCode: -1,
          errMessage: "Missing assignment id or class id",
        });
      }
      let assignment = await Assignment.findOne({
        where: {
          id: assignId,
          classId: c_id,
        },
      });
      resolve({
        errCode: 0,
        data: assignment,
      });
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
      await Assignment.update(
        {
          assignmentTitle: infor.assignmentTitle,
          instruction: infor.instruction,
          point: infor.point,
          dueDate: infor.dueDate,
          scale: infor.scale,
          isFinal: infor.isFinal,
        },
        {
          where: {
            id: c_id,
          },
        }
      ).then((assignment) => {
        resolve({
          errCode: 0,
          data: assignment,
        });
      });
    } catch (e) {
      reject(e);
    }
  });
};

exports.GetGradeOfAssignment = async (a_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!a_id) {
        resolve({
          errCode: 1,
          errMessage: "Missing params",
        });
      }
      let gradeList = await Grade.findAll({
        include: [
          {
            model: Assignment,
            attributes: [],
            where: {
              id: a_id,
            },
          },
        ],
        raw: true,
      });
      resolve({
        errCode: 0,
        data: gradeList,
      });
    } catch (e) {
      reject(e);
    }
  });
};
