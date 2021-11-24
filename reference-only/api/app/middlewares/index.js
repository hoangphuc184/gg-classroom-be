const authJwt = require("../middlewares/authJwt");
const verifySignUp = require("../middlewares/verifySignup")

module.exports = {
  authJwt,
  verifySignUp
};