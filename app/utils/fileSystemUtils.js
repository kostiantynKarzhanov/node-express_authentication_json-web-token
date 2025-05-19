// ----- import built-in modules -----
import { mkdir } from 'node:fs/promises';
import { basename } from 'node:path';

const mkdirIfNotExist = async (path) => {
    try {
        await mkdir(path);

        console.log(`Directory "${basename(path)}" has been created`);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.error('Directory already exist');
        } else {
            throw err;
        }
    }
}

export {
    mkdirIfNotExist
};