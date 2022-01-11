module.exports = (app) => {
  const admins = require("../controllers/adminController");
  const { authJwt } = require("../middlewares");

  app.get(
    "/api/admins",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.viewAdminList
  );

  app.get(
    "/api/admins/search",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.searchAdminByNameOrEmail
  );

  app.get(
    "/api/admins/detail/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.viewAdminDetail
  );

  app.get(
    "/api/admins/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.viewUserList
  );

  app.get(
    "/api/admins/users/search",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.searchUserByNameOrEmail
  );

  app.get(
    "/api/admins/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.viewUserDetail
  );

  app.post(
    "/api/admins/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.manualMappingStudentId
  );

  app.delete(
    "/api/admins/users/:userId",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.banUser
  );

  app.get(
    "/api/admins/classes",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.viewClassList
  );

  app.get(
    "/api/admins/classes/search",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.searchClassByName
  );

  app.get(
    "/api/admins/classes/:classId",
    [authJwt.verifyToken, authJwt.isAdmin],
    admins.viewClassDetail
  );
};
