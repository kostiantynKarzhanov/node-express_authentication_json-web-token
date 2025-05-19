// ----- import built-in modules -----
import { createSign, createVerify } from 'node:crypto';

// ----- import config modules -----
import { accessTokenAlgorithm } from '../config/defaultsConfig.js';

// ----- import config modules -----
import { keyManager } from '../config/keyPairConfig.js';

const createDigitalSignature = (data) => {
    const signObj = createSign(accessTokenAlgorithm);

    signObj.write(data);
    signObj.end();

    return signObj.sign(keyManager.private, 'base64url');
};

const verifyDigitalSignature = (data, signature) => {
    const verifyObj = createVerify(accessTokenAlgorithm);

    verifyObj.write(data);
    verifyObj.end();

    return verifyObj.verify(keyManager.public, signature, 'base64url');
};

export {
    createDigitalSignature,
    verifyDigitalSignature
};