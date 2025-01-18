const express = require("express");
const router = express.Router();
const validate = require("../middlewares/validate.js");
const { register, login, googleLogin, googleCallback } = require('../controllers/auth.controller.js');
const { register: registerValidation, login: loginValidation } = require('../validations/auth.validation.js');
const logging = require("../middlewares/logging.js");
const passport = require("passport");

router.use(logging());

router.post(
  "/register", 
  validate(registerValidation), 
  register
);

router.post(
  "/login", 
  validate(loginValidation), 
  login
);

// router.get('/auth/google', googleLogin);
// router.get(
//     '/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
//     googleCallback
// );

module.exports = router;