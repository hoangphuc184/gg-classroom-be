module.exports = (app) => {
  const users = require("../controllers/userController.js");
  const { authJwt } = require("../middlewares");

  app.get("/api/users", [authJwt.verifyToken, authJwt.isTecherOrAdmin], users.findAll);

  app.get("/api/users/:id", [authJwt.verifyToken, authJwt.isTecherOrAdmin], users.findById);

  app.put("/api/users/:id", [authJwt.verifyToken], users.update);
};
