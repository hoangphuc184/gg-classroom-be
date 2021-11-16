const userService = require("../services/userService");
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.username || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  if (req.body.role && req.body.studentID) {
    res.status(400).send({
      message: "Teacher can't have student ID",
    });
    return;
  }

  // Create a User

  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      studentID: req.body.studentID,
      DOB: req.body.DOB,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      fullName: req.body.fullName,
    };

    if (!user.role && !user.studentID) {
      res.status(200).json({ message: "Student ID can't be null" });
      return;
    }
    const userRes = await userService.create(user);
    if (userRes.dataValues.role === true) {
      res.status(200).json({ message: "Teacher created!" });
    } else if (userRes.dataValues.role === false) {
      res.status(200).json({ message: "Student created!" });
    } else {
      res.status(404).json({ message: "Error!" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await userService.findAll();
    if (users) {
      res.status(200).json(users);
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

    const users = await userService.findById(id);
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ message: `No user with id = ${id} was found` });
    }
  } catch (err) {
    console.log(err);
  }
};
