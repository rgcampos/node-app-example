'use strict';

const express = require('express');
const jwt = require('../../../helpers/jwt-validate');
const controller = require('../../../controllers/user');

let router = express.Router();
router
    .route('/')
    .get(controller.get)
    .post(controller.post)
    .delete(controller.delete);

router
    .route('/:id')
    .get(controller.getById);

module.exports = router;