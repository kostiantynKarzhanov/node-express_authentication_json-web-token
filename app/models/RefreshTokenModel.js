// ----- import built-in modules -----
import mongoose from 'mongoose';

// ----- import models -----
import UserModel from './UserModel.js';

const refreshTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: UserModel,
        required: true
    }, 
    value: {
        type: String,
        unique: true,
        required: true
    },
    expireAt: {
        type: Date,
        expires: 0,
        required: true
    }
}, 
{ 
    // If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
    // createdAt: a date representing when this document was created
    // updatedAt: a date representing when this document was last updated
    // The createdAt property is immutable, and Mongoose overwrites any user-specified updates to updatedAt by default.
    timestamps: true
});

const RefreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);

export default RefreshTokenModel;

