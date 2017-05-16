//Funcionalidad de express
'use strict'


const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('view engine', 'hbs')

app.engine('.hbs', hbs({
  defaultLayout: __dirname + '/views/layouts/default.hbs',
  extname: '.hbs'
}))

//la ruta api usara el modulo api
app.use('/api',api)
app.get('/login', (req, res) => {
  res.render('login')
})
app.get('/product', (req, res) => {
  res.render('product')
})

module.exports = app
