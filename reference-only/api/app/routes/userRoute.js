module.exports = (app) => {
  const users = require("../controllers/userController.js");

  var router = require("express").Router();

  router.post("/", users.create);

  router.get("/", users.findAll);

  router.get("/:id", users.findById);

  app.use("/api/users", router);
};
