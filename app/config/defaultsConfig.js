// ----- import built-in modules -----
import 'dotenv/config';

export const port = Number(process.env.PORT) || 3000;
export const dbString = process.env.DB_STR_MONGO;

// access token configuration
export const accessTokenAlgorithm = process.env.JWT_ALG || 'RSA-SHA256';
export const accessTokenName = process.env.JWT_COOKIE_NAME || 'access_token';
export const accessTokenTTL = Number(process.env.JWT_TTL_MS) || 60000; // 1 minute in milliseconds

// refresh token configuration
export const refreshTokenName = process.env.REFRESH_TOKEN_COOKIE_NAME || 'refresh_token';
export const refreshTokenTTL = Number(process.env.REFRESH_TOKEN_TTL_MS) || 180000; // 3 minutes in milliseconds

// cookie configuration
export const cookieSecureOptions = {
    secure: true,
    httpOnly: true,
    sameSite: 'strict'
};