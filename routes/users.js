const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

/* GET users listing. */
router.get("/:id", userController.user_detail_get);

module.exports = router;
