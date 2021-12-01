module.exports = (app) => {
  const addUser = require("../controllers/addUserToClassController");
  const { authJwt } = require("../middlewares");

  // var router = require("express").Router();

  app.post(
    "/api/addUser",
    // [authJwt.verifyToken, authJwt.isTeacher],
    addUser.addUser
  );
  // router.post("/", addUser.addUser);

  app.post(
    "/api/addUser/join",
    // [authJwt.verifyToken, authJwt.isTeacher],
    addUser.joinClass
  );
  // router.post("/join", addUser.joinClass);

  // app.use("/api/addUser", router);
};
