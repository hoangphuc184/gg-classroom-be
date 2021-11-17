module.exports = (app) => {
  const addUser = require("../controllers/addUserToClassController");
  const passport = require("../auth/login");

  var router = require("express").Router();

  router.post("/", addUser.addUser);
  router.post("/join", addUser.joinClass);
  app.use(
    "/api/addUser",
    passport.authenticate("jwt", { session: false }),
    router
  );
};
