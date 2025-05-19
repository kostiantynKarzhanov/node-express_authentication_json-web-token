// ----- import models -----
import UserModel from '../models/UserModel.js';

const createUser = (name, hash, salt) => UserModel.create({ name, hash, salt });
const findUserById = (id) => UserModel.findById(id).exec();
const findUserByName = (name) => UserModel.findOne({ name }).exec();

export {
    createUser,
    findUserById,
    findUserByName
}
