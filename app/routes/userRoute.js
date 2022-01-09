module.exports = (app) => {
  const users = require("../controllers/userController.js");
  const { authJwt } = require("../middlewares");
  const upload = require("../middlewares/upload");
  app.get("/api/users", [authJwt.verifyToken], users.findAll);

  app.get("/api/users/:userId", [authJwt.verifyToken], users.findForProfile);

  app.put("/api/users/:id", [authJwt.verifyToken], users.update);

  app.get("/api/teacher", [authJwt.verifyToken], users.findAllTeacherOfClass);

  app.get("/api/student", [authJwt.verifyToken], users.findAllStudentOfClass);

  // app.get(
  //   "/api/download/student",
  //   [authJwt.verifyToken, authJwt.isTeacher],
  //   users.downloadAllStudentOfClass
  // );
  app.post(
    "/api/upload/student",
    upload.single("file"),
    [authJwt.verifyToken, authJwt.isTeacher],
    users.upload
  );
};
