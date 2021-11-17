module.exports = (app) => {
  const jwt = require("jsonwebtoken");
  const passport = require("./index");

  var router = require("express").Router();

  router.post(
    "/",
    passport.authenticate("local", { session: false }),
    function (req, res) {
      res.json({
        user: req.user,
        token: jwt.sign(
          {
            id: req.user.id,
            usename: req.user.username,
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "2h" }
        ),
      });
    }
  );

  app.use("/api/login", router);
};
