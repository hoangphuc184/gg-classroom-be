module.exports = (app) => {
  const addUser = require("../controllers/addUserToClassController");

  var router = require("express").Router();

  router.post("/", addUser.addUser);
  router.post("/join", addUser.joinClass);
  
  app.use("/api/addUser", router);
};
