const classService = require("../services/classService");

exports.list = async (req, res) => {
  //validation
  try {
    const classes = await classService.list();

    if (classes) {
      res.status(200).json(classes);
    } else {
      res.status(404).json({ message: "No classes were not found" });
    }
  } catch (err) {
    next(err);
  }
};

exports.create = function (req, res) {
  //validation
  try {
    const classObj = {
      name: req.body.name,
    };
    const classID = classService.create(classObj);
    if (classID) {
      res.status(200).json({ message: "Class created" });
    } else {
      res
        .status(404)
        .json({ message: "The class with the given ID was not found" });
    }
  } catch (err) {
    next(err);
  }
};
