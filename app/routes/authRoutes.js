const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/authController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/forgot-password", controller.forgotPassword);

  app.post(
    "/api/auth/reset-password",
    [authJwt.verifyToken],
    controller.resetPassword
  );

  app.post("/api/auth/verify-account", controller.verifyAccount);

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.post(
    "/api/auth/signup/google-sign-up",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.googleSignUp
  );

  app.post("/api/auth/signin/google-sign-in", controller.googleSignIn);

  app.post("/api/auth/signin", controller.signin);
};
