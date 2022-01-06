module.exports = (app) => {
  const assignment = require("../controllers/assignmentController");
  const { authJwt } = require("../middlewares");

  app.post(
    "/api/assignments",
    // [authJwt.verifyToken, authJwt.isTeacher],
    assignment.createAssignment
  );

  app.get(
    "/api/assignments/all",
    [authJwt.verifyToken],
    assignment.findAllAssignment
  );

  app.get(
    "/api/assignments",
    // [authJwt.verifyToken],
    assignment.findAllAssignmentWithClassId
  );

  app.get("/api/assignments/:id", assignment.findAssignmentWithClassId);

  app.put(
    "/api/assignments",
    // [authJwt.verifyToken],
    assignment.updateAssignment
  );

  app.delete(
    "/api/assignments",
    // [authJwt.verifyToken, authJwt.isTeacher],
    assignment.deleteAssignmentOfClass
  );

  app.get("/api/assignments/:id/grades", assignment.GetGradeOfAssignment);
};
