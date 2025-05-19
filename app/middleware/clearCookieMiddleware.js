// ----- import config modules -----
import { accessTokenName, refreshTokenName, cookieSecureOptions } from '../config/defaultsConfig.js';

// ----- import services -----
import { removeRefreshToken } from '../services/refreshTokenService.js';

const clearCookieMiddleware = async (req, res, next) => {
    const { [refreshTokenName]: refreshToken } = req.cookies;
    const cookieToClearArr = [accessTokenName, refreshTokenName];

    await removeRefreshToken(refreshToken);

    // You cannot directly force the browser to delete a cookie from a server response — but you can instruct it to expire the cookie immediately.
    // clearCookie sets a cookie with a given name to expiration date in the past: 01 Jan 1970 00:00:00 GMT
    // res.clearCookie(name, options);
    cookieToClearArr.forEach(i => res.clearCookie(i, cookieSecureOptions));

    return next();
};

export default clearCookieMiddleware;