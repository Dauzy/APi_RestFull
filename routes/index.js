'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const api = express.Router()


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

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', productCtrl.saveProduct)
api.put('/product/:productId', productCtrl.updateProduct)
api.delete('/product/:productId', productCtrl.deleteProduct)


module.exports = api
