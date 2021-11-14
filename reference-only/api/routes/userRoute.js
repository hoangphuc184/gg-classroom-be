const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* GET classes list. */
router.get("/", userController.list);

router.post("/", userController.create);

module.exports = router;
