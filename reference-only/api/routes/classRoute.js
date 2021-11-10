const express = require("express");
const router = express.Router();
const classController = require("../controllers/classController");

/* GET classes list. */
router.get("/", classController.list);

router.post("/", classController.create);

module.exports = router;
