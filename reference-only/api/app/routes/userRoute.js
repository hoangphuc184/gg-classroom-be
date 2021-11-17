module.exports = (app) => {
  const users = require("../controllers/userController.js");
  const passport = require("../auth/login");

  var router = require("express").Router();

  router.post("/", users.create);

  router.get("/", users.findAll);

  router.get("/:id", users.findById);

  app.use(
    "/api/users",
    passport.authenticate("jwt", { session: false }),
    router
  );
};
