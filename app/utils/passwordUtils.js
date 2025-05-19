// ----- import built-in modules -----
import { promisify } from 'node:util';
import { randomBytes, pbkdf2, timingSafeEqual } from 'node:crypto';

const pbkdf2Promise = promisify(pbkdf2);

const generateHashFromPassword = async (password, salt) => {
    const effectiveSalt = salt ?? randomBytes(16).toString('hex');
    const derivedKey = await pbkdf2Promise(password, effectiveSalt, 100_000, 64, 'sha512');

    return { 
        hash: derivedKey.toString('hex'), 
        salt: effectiveSalt 
    };
};

const validatePassword = async (password, hashCompare, saltCompare) => {
    const { hash } = await generateHashFromPassword(password, saltCompare);

    const bufferHash = Buffer.from(hash, 'hex');
    const bufferHashCompare = Buffer.from(hashCompare, 'hex');

    if (bufferHash.length !== bufferHashCompare.length) return false;

    return timingSafeEqual(bufferHash, bufferHashCompare);
};

export {
    generateHashFromPassword,
    validatePassword
};