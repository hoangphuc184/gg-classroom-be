module.exports = (app) => {
  const grades = require("../controllers/gradeController");
  const { authJwt } = require("../middlewares");

  const upload = require("../middlewares/upload");
  app.post(
    "/api/grades",
    [authJwt.verifyToken, authJwt.isTeacher],
    grades.createGradeOfAssignment
  );
  app.get("/api/grades", [authJwt.verifyToken], grades.findAll);
  // app.get(
  //   "/api/grades/download-template",
  //   [authJwt.verifyToken, authJwt.isTeacher],
  //   grades.downloadGradeTemplate
  // );
  app.post(
    "/api/upload/grades",
    upload.single("file"),
    [authJwt.verifyToken, authJwt.isTeacher],
    grades.upload
  );
};
