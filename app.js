//Funcionalidad de express
'use strict'


const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//la ruta api usara el modulo api 
app.use('/api',api)

module.exports = app
