'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        user: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
            required: [true, 'O usuário é campo obrigatório.']
        },
        password: {
            type: String,
            required: [true, 'A senha é campo obrigatório.']
        },
        active: {
            type: Boolean,
            required: [true, 'A senha é campo obrigatório.'],
            default: true
        }
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', function (next) {
    let user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(user.password, parseInt(process.env.APP_SALT, 10), function (err, hash) {
        if (err) {
            return next(err);
        }

        user.password = hash;
        next();
    });
});

userSchema.methods.checkPassword = (passwd, next) => {
    bcrypt.compare(passwd, this.password, (err, isMatch) => {
        if (err) {
            return next(err);
        }
        next(isMatch);
    });
};


module.exports = mongoose.model('User', userSchema);