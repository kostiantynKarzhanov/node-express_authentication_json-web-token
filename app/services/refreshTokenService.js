// ----- import built-in modules -----
import { randomBytes } from 'node:crypto';

// ----- import config modules -----
import { refreshTokenName, refreshTokenTTL, cookieSecureOptions } from '../config/defaultsConfig.js';

// ----- import dal -----
import { createRefreshToken, findRefreshTokenByValue, updateRefreshTokenByValue, deleteRefreshToken } from '../dal/tokenDAL.js';

const generateRefreshToken = async (user) => {
    const { id: userId } = user;
    const value = randomBytes(64).toString('hex');
    const expireAt = Date.now() + refreshTokenTTL;

    const refreshToken = await createRefreshToken(userId, value, expireAt);

    return refreshToken.value;
};

const getUserIdFromRefreshToken = async (token) => {
    const refreshToken = await findRefreshTokenByValue(token);

    if (!refreshToken || refreshToken.expireAt < Date.now()) return null;

    return refreshToken.userId;
};

const updateRefreshToken = async (value) => {
    const newValue = randomBytes(64).toString('hex');
    const expireAt = Date.now() + refreshTokenTTL;

    await updateRefreshTokenByValue(value, newValue, expireAt);

    const refreshToken = await findRefreshTokenByValue(newValue);

    return refreshToken.value;
};

const removeRefreshToken = (token) => deleteRefreshToken(token);

const issueRefreshTokenCookie = (value) => {
    return {
        name: refreshTokenName,
        value,
        options: {
            ...cookieSecureOptions,
            maxAge: refreshTokenTTL
        }
    };
};

const getRefreshTokenCookie = async (user) => {
    const refreshToken = await generateRefreshToken(user);
    const refreshTokenCookie = issueRefreshTokenCookie(refreshToken);

    return refreshTokenCookie;
};

const getUpdatedRefreshTokenCookie = async (refreshToken) => {
    const newRefreshToken = await updateRefreshToken(refreshToken);
    const refreshTokenCookie = issueRefreshTokenCookie(newRefreshToken);

    return refreshTokenCookie;
};

export {
    getUserIdFromRefreshToken,
    updateRefreshToken,
    removeRefreshToken,
    getRefreshTokenCookie,
    getUpdatedRefreshTokenCookie
};