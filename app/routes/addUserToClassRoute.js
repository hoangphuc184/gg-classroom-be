module.exports = (app) => {
  const addUser = require("../controllers/addUserToClassController");
  const { authJwt } = require("../middlewares");

  app.post(
    "/api/addUser",
    [authJwt.verifyToken, authJwt.isTeacher],
    addUser.addUser
  );

  app.post(
    "/api/addUser/join",
    addUser.joinClass
  );
};
