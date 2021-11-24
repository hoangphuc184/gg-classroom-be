module.exports = (app) => {
  const classes = require("../controllers/classController");
  const { authJwt } = require("../middlewares");

  app.post(
    "/api/classes",
    [authJwt.verifyToken, authJwt.isTeacher],
    classes.create
  );

  app.get("/api/classes", 
  // [authJwt.verifyToken], 
  classes.findAll);

  app.get("/api/classes/:id", 
  // [authJwt.verifyToken], 
  classes.findById);

  app.get(
    "/api/classes/user/:u_id",
    // [authJwt.verifyToken],
    classes.findByUserId
  );
};
