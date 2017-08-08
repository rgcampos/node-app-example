'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.get = (req, res, next) => {
    User
        .find({}, 'user active')
        .then((users) => {
            res.status(200).send({
                success: true,
                users
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err
            });
        });
};

module.exports.getById = (req, res, next) => {
    User
        .findById(req.params.id)
        .then((user) => {
            res.status(200).send({
                success: true,
                user
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err
            });
        });
};


module.exports.put = (req, res, next) => {
    let newUser = new User({
        user: 'renato.campos@br.ibm.com',
        password: '123456'
    });

    newUser
        .save()
        .then((doc) => {
            console.log('User saved successfully');
            res.status(201).send({
                success: true,
                user: doc
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err
            });
        });
};


module.exports.post = (req, res, next) => {
    let newUser = new User({
        user: 'renato.campos@br.ibm.com',
        password: '123456'
    });

    newUser
        .save()
        .then((doc) => {
            console.log('User saved successfully');
            res.status(201).send({
                success: true,
                user: doc
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err
            });
        });
};


module.exports.delete = (req, res, next) => {
    User.remove({}, (err, numRecords) => {
        if (err) {
            res.status(400).send({
                success: false,
                error: err
            });
        }

        res.status(200).send({
            success: true,
            remove: numRecords
        });
    });
};