'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const api = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')


//Peticiones a APIREST (MIDDLEWARE)

/* Mandamos un response al  html
app.get('/hola', (req, res) => {
    res.send({message: 'HOla MUndo!'})
});
*/
/*request, pasamos un parametro por url
app.get('/hola/:name', (req, res) => {
    res.send({message: `Hola ${req.params.name}!`})
});
*/

api.get('/product', auth,productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, function(req,res){
  res.status(200).send({message: 'You are in!'})
})


module.exports = api
