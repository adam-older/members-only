const express = require("express");
const router = express.Router();
const post_controller = require("../controllers/postController");
const login_controller = require("../controllers/loginController");
const logout_controller = require("../controllers/logoutController");
const register_controller = require("../controllers/registerController");

/* GET home page. */
router.get("/", post_controller.index);

// GET login page
router.get("/login", login_controller.login_get);

// POST login page
router.post("/login", login_controller.login_post);

// GET logout
router.get("/logout", logout_controller.logout_get);

// GET register page
router.get("/register", register_controller.register_get);

// POST register page
router.post("/register", register_controller.register_post);

module.exports = router;
