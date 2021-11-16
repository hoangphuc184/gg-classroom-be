const addUser = require("../services/addUserToClassService");

exports.addUser = async (req, res) => {
  try {
    if (!req.body.classID || !req.body.userID) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }
    const addUserRes = await addUser.addUser(req.body.userID, req.body.classID);
    if (!addUserRes) {
      res
        .status(200)
        .json({ message: "Error! Class or Student is not found!" });
    }
    res.status(200).json({ message: "Added!" });
  } catch (err) {
    console.log(err);
  }
};
