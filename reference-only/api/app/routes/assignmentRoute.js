module.exports = (app) => {
    const assignment = require("../controllers/assignmentController");
    const { authJwt } = require("../middlewares");
  
    app.post("/api/assignments", [authJwt.verifyToken, authJwt.isTeacher], assignment.createAssignment);
  
    app.get("/api/assignments", [authJwt.verifyToken], assignment.findAllAssignmentWithClassId);
  
    // app.get("/api/classes/:id", [authJwt.verifyToken], classes.findById);
  };
  