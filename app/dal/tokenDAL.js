// ----- import models -----
import RefreshTokenModel from '../models/RefreshTokenModel.js';

const createRefreshToken = (userId, value, expireAt) => RefreshTokenModel.create({ userId, value, expireAt });
const findRefreshTokenByValue = (value) => RefreshTokenModel.findOne({ value }).exec();
const updateRefreshTokenByValue = (value, newValue, expireAt) => RefreshTokenModel.updateOne({ value }, { value: newValue, expireAt }).exec();
const deleteRefreshToken = (value) => RefreshTokenModel.deleteOne({ value }).exec();

export {
    createRefreshToken,
    findRefreshTokenByValue,
    updateRefreshTokenByValue,
    deleteRefreshToken
};