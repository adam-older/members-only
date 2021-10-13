var express = require("express");
var router = express.Router();
var post_controller = require("../controllers/postController");
var login_controller = require("../controllers/loginController");

/* GET home page. */
router.get("/", post_controller.index);

// GET login page
router.get("/login", login_controller.login_get);

module.exports = router;
