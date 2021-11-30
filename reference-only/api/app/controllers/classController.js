const classService = require("../services/classService");
const userService = require("../services/userService")
exports.create = async (req, res) => {
  try {
    const Class = {
      className: req.body.className,
      numberOfStudent: req.body.numberOfStudent,
      banner: req.body.banner,
      teacherId: req.userId,
    };
    const classRes = await classService.create(Class);
    res.status(200).json(classRes);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server"
    })
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
