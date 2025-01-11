const catchAsync = require("../utils/catchAsync.js");
const { registerService, loginService } = require("../services/auth.service.js");
const httpStatus = require("http-status").status;
const passport = require("passport");

const register = catchAsync(async (req, res) => {
    await registerService(req.body);
    res.status(httpStatus.CREATED).send({ message: 'Register successfully!' });
});

const login = catchAsync(async (req, res) => {
    const user = await loginService(req.body);
    res.status(httpStatus.OK).send(user);
});

const googleLogin = catchAsync((req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
});

const googleCallback = catchAsync((req, res) => {
    if (!req.user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ message: 'Authentication failed' });
    }
    return res.status(httpStatus.OK).json({
        message: 'Login successful',
        user: req.user,
    });
});

module.exports = {
    register,
    login,
    googleLogin,
    googleCallback
}