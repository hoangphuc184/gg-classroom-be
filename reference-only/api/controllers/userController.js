const userService = require("../services/userService");

exports.findByObj = async (req, res) => {
  //validation
  const userObj = {
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const user = await userService.findByObj(userObj);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not exist" });
    }
  } catch (err) {
    next(err);
  }
};

exports.create = function (req, res) {
  try {
    const userObj = {
      username: req.body.username,
      password: req.body.password,
    };
    const userId = userService.create(userObj);
    if (userId) {
      res.status(200).json({ message: "User created" });
    } else {
      res
        .status(404)
        .json({ message: "The user with the given ID was not found" });
    }
  } catch (err) {
    next(err);
  }
};

exports.list = async (req, res) => {
    try {
        const users = await userService.list();
    
        if (users) {
          res.status(200).json(users);
        } else {
          res.status(404).json({ message: "No classes were not found" });
        }
      } catch (err) {
        next(err);
      }
}
