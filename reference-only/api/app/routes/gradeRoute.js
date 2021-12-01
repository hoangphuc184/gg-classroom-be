module.exports = (app) => {
  const grades = require("../controllers/gradeController");
  const { authJwt } = require("../middlewares");

  app.post("/api/grades", grades.create);
  app.get("/api/grades", grades.findAll);
  app.get("/api/download/grades", grades.downAll);
};
