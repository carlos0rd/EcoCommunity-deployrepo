const express = require('express');
const router = express.Router();

const authController = require("../controllers/auth.controller")
const runValidator = require("../validators/index.middleware");
const { registerValidator } = require("../validators/auth.validators");
const { authentication } = require("../middlewares/auth.middlewares");

router.post("/register",
    registerValidator,
    runValidator,
    authController.register
);

router.post("/login", 
    authController.login);

router.get("/whoami",
authentication,
authController.whoami
);

router.post("/UserFeed",
authentication,
authController.changeProfilePicture
);

module.exports = router;