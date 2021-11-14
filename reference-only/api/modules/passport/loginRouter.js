const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const passport = require("./index");

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

module.exports = router;
