module.exports = (app) => {
  const users = require("../controllers/userController.js");
  const { authJwt } = require("../middlewares");

  app.get(
    "/api/users",
    // [authJwt.verifyToken, authJwt.isTecherOrAdmin],
    users.findAll
  );

  app.get(
    "/api/users/:userId",
    // [authJwt.verifyToken, authJwt.isTecherOrAdmin],
    users.findForProfile
  );

  app.put("/api/users/:id", 
  // [authJwt.verifyToken], 
  users.update);

  app.get("/api/teacher", 
  // [authJwt.verifyToken], 
  users.findAllTeacherOfClass);

  app.get("/api/student", 
  // [authJwt.verifyToken], 
  users.findAllStudentOfClass);
};
