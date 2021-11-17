module.exports = (app) => {
  const classes = require("../controllers/classController");

  var router = require("express").Router();

  router.post("/", classes.create);

  router.get("/", classes.findAll);

  router.get("/:id", classes.findById);

  app.use("/api/classes", router);
};
