'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.getById = (id) => {
    return User
        .findById(id);
}

module.exports.get = () => {
    return User
        .find({}, 'user active');
}

module.exports.create = (data) => {
    return new User({
        user: data.email,
        password: data.password
    }).save();
}

module.exports.update = (id, data) => {
    return User
        .findByIdAndUpdate(id, {
            $set: {
                user: data.email,
                password: data.password
            }
        });
}

module.exports.remove = (id) => {
    return User
        .findByIdAndRemove(id);
}