const addUser = require("../services/addUserToClassService");

exports.addUser = async (req, res) => {
  try {
    if (!req.body.classId || !req.body.email) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    const addUserRes = await addUser.addUser(req.body.classId, req.body.email);
    res.status(200).json(addUserRes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.joinClass = async (req, res) => {
  try {
    const { token } = req.body;
    const addUserRes = await addUser.joinClass(token);
    res.status(200).json(addUserRes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errCode: -1,
      errMessage: "Class Code not correct",
    });
  }
};
