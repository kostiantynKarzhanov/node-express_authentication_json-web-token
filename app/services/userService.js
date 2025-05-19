// ----- import dal -----
import { createUser, findUserById, findUserByName } from '../dal/userDAL.js';

// ----- import utils -----
import { generateHashFromPassword, validatePassword } from '../utils/passwordUtils.js';

const getUserById = (id) => findUserById(id);
const getUserByName = (name) => findUserByName(name);

const registerUser = async (name, password) => {
    const { hash, salt } = await generateHashFromPassword(password);

    return createUser(name, hash, salt);
};

const verifyUser = async (password, user) => {
    const isVerified = user && await validatePassword(password, user.hash, user.salt);

    return isVerified;
};

export {
    getUserById,
    getUserByName,
    registerUser,
    verifyUser,
};