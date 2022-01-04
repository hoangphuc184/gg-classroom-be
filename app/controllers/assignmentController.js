const assignmentService = require("../services/assignmentService");
exports.createAssignment = async (req, res) => {
  try {
    let assignment = await assignmentService.createAssignment(req.body);
    return res.status(200).json(assignment);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.findAllAssignmentWithClassId = async (req, res) => {
  try {
    let assignments = await assignmentService.findAllAssignmentWithClassId(
      req.query.c_id
    );
    return res.status(200).json(assignments);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.findAssignmentWithClassId = async (req, res) => {
  try {
    let assignment = await assignmentService.findAssignmentWithClassId(
      req.params.id,
      req.query.c_id
    );
    return res.status(200).json(assignment);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.deleteAssignmentOfClass = async (req, res) => {
  try {
    let id = req.query.id;
    let c_id = req.query.c_id;
    if (id && c_id) {
      let message = await assignmentService.deleteAssignmentOfClass(id, c_id);
      return res.status(200).json(message);
    }
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
exports.updateAssignment = async (req, res) => {
  try {
    const assignments = await assignmentService.updateAssignment(
      req.query.id,
      req.body
    );
    return res.status(200).json(assignments);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.GetGradeOfAssignment = async (req, res) => {
  try {
    const gradeList = await assignmentService.GetGradeOfAssignment(
      req.params.id
    );
    res.status(200).json(gradeList);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
