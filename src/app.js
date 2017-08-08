'use strict';


const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


let readRecursiveDirectory = (dir, filelist) => {
    let files = fs.readdirSync('./src/' + dir);
    filelist = filelist || [];
    files.forEach((file) => {
        if (fs.statSync(path.join('./src/' + dir, file)).isDirectory()) {
            filelist = readRecursiveDirectory(path.join(dir, file), filelist);
        } else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};




// -- INICIO --
//Inicia banco de dados e models
mongoose.Promise = require('bluebird');
mongoose.connect(
    process.env.CONN_DB,
    {
        useMongoClient: true
    },
    (err) => {
        if (err) {
            console.error(err);
        }
    }
);
let fileModels = readRecursiveDirectory('models');
fileModels.forEach((file) => {
    let m = file.replace('.js', '');
    require('./' + m);
    console.log('Model ' + m + ' --> ok!');
});
// -- FIM --



// -- INICIO --
//Mapeia rotas automatico dentro da pasta routes
let router = express.Router();
let fileRoutes = readRecursiveDirectory('routes');


fileRoutes.forEach((file) => {
    let rf = require('./' + file.replace('.js', ''));
    let fn = file.replace('routes', '').split('\\').join('/').replace('.js', '');
    app.use(fn, rf);
    console.log('Route ' + fn + ' --> ok!');
});
// -- FIM --




app.get('/api', (req, res, next) => {
    res.status(200).send({
        title: 'Node API to ChaTTools',
        version: '0.0.1',
        path: '/api/v1'
    });
});

module.exports = app;