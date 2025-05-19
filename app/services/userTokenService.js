// ----- import services -----
import { getUserByName, verifyUser } from './userService.js';
import { getAccessTokenCookie } from './accessTokenService.js';
import { getRefreshTokenCookie } from './refreshTokenService.js';

const loginUser = async (name, password) => {
    const user = await getUserByName(name);
    const isVerified = await verifyUser(password, user);

    if (!isVerified) return null;

    const accessTokenCookie = getAccessTokenCookie(user);
    const refreshTokenCookie = await getRefreshTokenCookie(user);

    return [accessTokenCookie, refreshTokenCookie];
};

export {
    loginUser
};
