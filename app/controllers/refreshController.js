// ----- import config modules -----
import { refreshTokenName } from '../config/defaultsConfig.js';

// ----- import services -----
import { getUserById } from '../services/userService.js';
import { getAccessTokenCookie } from '../services/accessTokenService.js';
import { getUserIdFromRefreshToken, getUpdatedRefreshTokenCookie } from '../services/refreshTokenService.js';

const handleTokenRefresh = async (req, res, next) => {
    const { [refreshTokenName]: refreshToken } = req.cookies;
    const userId = await getUserIdFromRefreshToken(refreshToken);
    const user = userId && await getUserById(userId);

    if (user) {
        const accessTokenCookie = getAccessTokenCookie(user);
        const refreshTokenCookie = await getUpdatedRefreshTokenCookie(refreshToken);

        res.cookie(accessTokenCookie.name, accessTokenCookie.value, accessTokenCookie.options);
        res.cookie(refreshTokenCookie.name, refreshTokenCookie.value, refreshTokenCookie.options);

        return res.redirect(303, '/protected');
    }

    return res.status(401).json({
        status: 'error',
        message: 'Invalid or expired refresh token.'
    });
};

export {
    handleTokenRefresh
}