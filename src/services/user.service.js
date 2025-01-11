const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status').status;
const db = require("../models/index.js");
const bcrypt = require('bcryptjs');

const createUser = async (payload) => {
    const { email, password } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({ email, password: hashedPassword });
    return user;
};

const findUser = async (email) => {
    const user = db.user.findOne({
        where: { email },
        attributes: ['email', 'password']
    });

    if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    return user;
};


const createUserByOauth = async (profile) => {
    if (!profile.id || !profile.emails || !profile.photos) {
        return done(new Error('Invalid Google profile data'), null);
    };
    const tokenLogin = UUIDV4();
    profile.tokenLogin = tokenLogin;

    const userByEmail = await db.user.findOne({ where: { email: profile.emails[0]?.value } });
    if (userByEmail) {
        await db.user.update(
            {
                status: AccountStatus.ACTIVE,
                tokenLogin: tokenLogin,
                providerId: profile.id,
            },
            {
                where: { id: userByEmail.id }
            }
        );
        const userUpdated = await db.user.findByPk(userByEmail.id);
        return [userUpdated, false];
    };


    const [user, created] = await db.user.findOrCreate({
        where: { providerId: profile.id },
        defaults: {
            providerId: profile.id,
            email: profile.emails[0]?.value,
            tokenLogin,
        },
    });

    return [user, created];
}

module.exports = {
    createUser,
    findUser,
    createUserByOauth
}