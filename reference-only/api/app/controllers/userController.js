const userService = require("../services/userService");
exports.update = async (req, res) => {
  try {
    const User = await userService.update(req.params.id, req.body);
    if (User) {
      res.status(200).json({ message: "User updated" });
    } else {
      res.status(404).json({ message: "Error updating user" });
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

exports.findAllTeacherOfClass = async (req, res) => {
  try {
    let teachers = await userService.findAllTeacherOfClass(req.query.c_id);
    res.status(200).json(teachers);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.findAllStudentOfClass = async (req, res) => {
  try {
    let students = await userService.findAllStudentOfClass(req.query.c_id);
    res.status(200).json(students);
  } catch (e) {
    console.log(e);
    res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
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
