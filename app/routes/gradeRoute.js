module.exports = (app) => {
  const grades = require("../controllers/gradeController");
  const { authJwt } = require("../middlewares");

  const upload = require("../middlewares/upload");
  app.post(
    "/api/grades",
    [authJwt.verifyToken, authJwt.isTeacher],
    grades.createGradeOfAssignment
  );
  app.get("/api/grades", grades.findAll);
  app.get("/api/download/grades", grades.downAll);
  app.post("/api/upload/grades", upload.single("file"), grades.upload);
};
