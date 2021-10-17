var express = require("express");
var router = express.Router();
var post_controller = require("../controllers/postController");
var login_controller = require("../controllers/loginController");
var register_controller = require("../controllers/registerController");

/* GET home page. */
router.get("/", post_controller.index);

// GET login page
router.get("/login", login_controller.login_get);

// POST login page
router.post("/login", login_controller.login_post);

// GET register page
router.get("/register", register_controller.register_get);

// POST register page
router.post("/register", register_controller.register_post);

module.exports = router;
