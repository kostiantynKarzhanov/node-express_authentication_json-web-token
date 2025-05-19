// ----- import config modules -----
import { accessTokenName, accessTokenTTL, cookieSecureOptions } from '../config/defaultsConfig.js';

// ----- import utils -----
import { createDigitalSignature, verifyDigitalSignature } from '../utils/digitalSignatureUtils.js';

const encodeBase64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');
const decodeBase64Url = (str) => JSON.parse(Buffer.from(str, 'base64url').toString('utf8'));

const generateAccessToken = (user) => {
    const { id: sub, name } = user;
    const iat = Date.now();
    const exp = iat + accessTokenTTL;

    const headerObj = { alg: 'RS256', typ: 'JWT' };
    const payloadObj = { sub, name, iat, exp };

    const headerBase64Url = encodeBase64Url(headerObj);
    const payloadBase64Url = encodeBase64Url(payloadObj);

    const jwtHeaderPayloadBase64Url = `${headerBase64Url}.${payloadBase64Url}`;
    const jwtSignatureBase64Url = createDigitalSignature(jwtHeaderPayloadBase64Url);

    return `${jwtHeaderPayloadBase64Url}.${jwtSignatureBase64Url}`;
};

const verifyAccessToken = (token) => {
    const [headerBase64Url, payloadBase64Url, jwtSignatureBase64Url] = token.split('.');

    if (!headerBase64Url || !payloadBase64Url || !jwtSignatureBase64Url) return false;

    const jwtHeaderPayloadBase64Url = `${headerBase64Url}.${payloadBase64Url}`;
    const isVerified = verifyDigitalSignature(jwtHeaderPayloadBase64Url, jwtSignatureBase64Url);

    if (!isVerified) return false;

    const { exp } = decodeBase64Url(payloadBase64Url);

    return exp > Date.now();
};

const getUserDataFromAccessToken = (token) => {
    const payloadBase64Url = token.split('.')[1];

    return decodeBase64Url(payloadBase64Url);
};

const issueAccessTokenCookie = (value) => {
    return {
        name: accessTokenName,
        value,
        options: {
            ...cookieSecureOptions,
            maxAge: accessTokenTTL
        }
    };
};

const getAccessTokenCookie = (user) => {
    const accessToken = generateAccessToken(user);
    const accessTokenCookie = issueAccessTokenCookie(accessToken);

    return accessTokenCookie;
};

export {
    verifyAccessToken,
    getUserDataFromAccessToken,
    getAccessTokenCookie
};