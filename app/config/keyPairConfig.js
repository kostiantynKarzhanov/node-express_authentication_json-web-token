// ----- import built-in modules -----
import { promisify } from 'node:util';
import { generateKeyPair } from 'node:crypto';
import { join } from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';

// ----- import utils -----
import { mkdirIfNotExist } from '../utils/fileSystemUtils.js';

const keysPath = 'keys';
const publicKeyPath = join(keysPath, 'publicKey.pem');
const privateKeyPath = join(keysPath, 'privateKey.pem');

const keyManager = {
    public: null,
    private: null
};

const generateKeyPairPromise = promisify(generateKeyPair);

const createKeyPair = async () => {
    try {
        await mkdirIfNotExist(keysPath);

        const { publicKey, privateKey } = await generateKeyPairPromise('rsa', {
            modulusLength: 4096, // Key size in bits
            publicKeyEncoding: {
                type: 'spki', // Must be one of 'pkcs1' (RSA only) or 'spki'.
                format: 'pem', // Must be 'pem', 'der', or 'jwk'.
            },
            privateKeyEncoding: {
                type: 'pkcs8', // Must be one of 'pkcs1' (RSA only), 'pkcs8' or 'sec1' (EC only).
                format: 'pem', // Must be 'pem', 'der', or 'jwk'.
                // cipher: 'aes-256-cbc', // If specified, the private key will be encrypted with the given cipher and passphrase using PKCS#5 v2.0 password based encryption.
                // passphrase: 'top secret', // The passphrase to use for encryption, see cipher.
            }
        });

        await Promise.all([writeFile(publicKeyPath, publicKey), writeFile(privateKeyPath, privateKey)]);
    } catch (err) {
        console.error(err.stack);

        throw err;
    }
};

const loadKeyPair = async () => {
    try {
        keyManager.public = await readFile(publicKeyPath, 'utf8');
        keyManager.private = await readFile(privateKeyPath, 'utf8');

        console.log('PUBLIC and PRIVATE keys have been successfully loaded into Key Manager');
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('Keys not found, generating new RSA key pair...');

            await createKeyPair();
            await loadKeyPair();
        } else {
            console.error(err.stack);

            throw err;
        }
    }
};

export {
    keyManager,
    loadKeyPair
}