'use strict';

const repository = require('../repositories/user');
const validateObj = require('../helpers/validator');

module.exports.get = (req, res, next) => {
    repository
        .get()
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
    repository
        .getById(req.params.id)
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

    validateObj.isEmail(req.body.email, 'Campo email inválido!');

    if (!validateObj.isValid()) {
        res.status(400).send({
            success: false,
            error: validateObj.errors
        });
    } else {
        repository
            .update(req.params.id, req.body)
            .then((doc) => {
                res.status(200).send({
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
    }
};


module.exports.post = (req, res, next) => {
    validateObj.isEmail(req.body.email, 'Campo email inválido!');

    if (!validateObj.isValid()) {
        res.status(400).send({
            success: false,
            error: validateObj.errors
        });
    } else {
        repository
            .create(req.body)
            .then((doc) => {
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
    }
};


module.exports.delete = (req, res, next) => {
    repository
        .delete(req.params.id)
        .then((doc) => {
            res.status(200).send({
                success: true
            });
        })
        .catch((err) => {
            res.status(400).send({
                success: false,
                error: err
            });
        });
};