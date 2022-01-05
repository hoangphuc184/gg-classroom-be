const adminService = require("../services/adminService");

exports.viewAdminList = async (req, res) => {
  try {
    let adminList = await adminService.viewAdminList();
    res.status(200).json(adminList);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.searchAdminByNameOrEmail = async (req, res) => {
  try {
    let { term } = req.query;
    term = term.toLowerCase();
    let searchedAdmin = await adminService.searchAdminByNameOrEmail(term);
    res.status(200).json(searchedAdmin);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.viewAdminDetail = async (req, res) => {
  try {
    let admin = await adminService.viewAdminDetail(req.params.id);
    res.status(200).json(admin);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.viewUserList = async (req, res) => {
  try {
    let userList = await adminService.viewUserList();
    res.status(200).json(userList);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.searchUserByNameOrEmail = async (req, res) => {
  try {
    let { term } = req.query;
    term = term.toLowerCase();
    let searchUser = await adminService.searchUserByNameOrEmail(term);
    res.status(200).json(searchUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.viewUserDetail = async (req, res) => {
  try {
    let user = await adminService.viewUserDetail(req.params.userId);
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.banUser = async (req, res) => {
  try {
    let bannedUser = await adminService.banUser(req.params.userId);
    res.status(200).json(bannedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.viewClassList = async (req, res) => {
  try {
    let classList = await adminService.viewClassList();
    res.status(200).json(classList);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.searchClassByName = async (req, res) => {
  try {
    let { term } = req.query;
    term = term.toLowerCase();
    let searchClasses = await adminService.searchClassByName(term);
    res.status(200).json(searchClasses);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.viewClassDetail = async (req, res) => {
  try {
    let cls = await adminService.viewClassDetail(req.params.classId);
    res.status(200).json(cls);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

exports.manualMappingStudentId = async (req, res) => {
  try {
    let mappedStu = await adminService.manualMappingStudentId(
      req.params.userId,
      req.body.cmd
    );
    res.status(200).json(mappedStu);
  } catch (e) {
    console.log(e);
    res.status(500).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
