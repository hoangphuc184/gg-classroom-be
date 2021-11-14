const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* GET classes list. */
router.get("/", userController.list);

module.exports = router;
