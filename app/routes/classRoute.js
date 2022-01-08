module.exports = (app) => {
  const classes = require("../controllers/classController");
  const { authJwt } = require("../middlewares");
  const upload = require("../middlewares/upload");

  app.post(
    "/api/classes",
    [authJwt.verifyToken, authJwt.isTeacher],
    classes.create
  );

  app.get(
    "/api/classes",
    // [authJwt.verifyToken],
    classes.findAll
  );

  app.get(
    "/api/classes/:id",
    // [authJwt.verifyToken],
    classes.findById
  );

  app.get(
    "/api/classes/user/:u_id",
    // [authJwt.verifyToken],
    classes.findByUserId
  );

  app.get("/api/classes/:id/students", classes.GetListStudentAndMappingID);

  app.post(
    "/api/classes/:id/students/upload",
    upload.single("file"),
    classes.uploadStudentList
  );

  app.post("/api/classes/join-class", classes.addStudentByClassCode);
};
