const classService = require("../services/classService");
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.className || !req.body.numberOfStudent || !req.body.banner) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a class

  try {
    const Class = {
      className: req.body.className,
      numberOfStudent: req.body.numberOfStudent,
      banner: req.body.banner,
    };
    const classRes = await classService.create(Class);
    if (classRes.dataValues.id) {
      res.status(200).json({ message: "Class created!" });
    } else {
      res.status(404).json({ message: "Error!" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const classes = await classService.findAll();
    if (classes) {
      res.status(200).json(classes);
    } else {
      res.status(404).json({ message: "No users were found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findById = async (req, res) => {
  try {
    const id = req.params.id;

    const classes = await classService.findById(id);
    if (classes) {
      res.status(200).json(classes);
    } else {
      res.status(404).json({ message: `No class with id = ${id} was found` });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findByUserId = async (req, res) => {
  try {
    const id = req.params.u_id;

    const classes = await classService.findByUserId(id);
    if (classes) {
      res.status(200).json(classes);
    } else {
      res.status(404).json({ message: `No class with id = ${id} was found` });
    }
  } catch (err) {
    console.log(err);
  }
};
