'use strict'
/*  PARA QUE UN APIREST SE REST FULL, NECESITA TENER
    LOS METODOS GET / POST / PUT / DELETE
*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Product = require('./models/product')
const port = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

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

app.get('/api/product',(req, res) => {
  Product.find({}, (err, products) => {
    if(err) res.status(500).send({message: `Failed to connect: ${err}`})
    if(!products) return res.status(404).send({message: 'Products not exists'})

    res.send(200, {products})
  });
});

app.get('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Failed to connect: ${err}`})
    if (!product) res.status(404).send({message: `Product not exists`})
    res.status(200).send({product: product})
  })
});

app.post('/api/product', (req, res) => {
  console.log('POST /api/product');
  console.log(req.body);

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if(err) res.status(500).send({message: `Error to Storage: ${err}`})
    res.status(200).send({product: productStored})
  });
  /*
  console.log(req.body)
  res.status(200).send({message: 'Prodcuto recibido'})*/
});

app.put('/api/product/:productId', (req, res) => {
  let productId = req.params.productId
  let update_body = req.body

  Product.findByIdAndUpdate(productId, update_body, (err, productUpdated) => {
    if (err) res.status(500).send({message: `Failed to connect: ${err}`})
    if (!productUpdated) res.status(404).send({message: `Product not exists`})

    res.status(200).send({product: productUpdated})
  });
});


app.delete('/api/product/:productId', (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Failed to connect: ${err}`})
    if (!product) res.status(404).send({message: `Product not exists`})

    product.remove(err =>{
      if (err) res.status(500).send({message: `Failed to connect: ${err}`})
      res.status(200).send({message: 'Se elimino con exito!'})
    });
  })

});

mongoose.connect('mongodb://localhost/apirest', (err, res) => {
  if (err){
    return console.log(`Failed to connect: ${err}`);
  }
  console.log('You are Connect!');

  app.listen(port, () => {
    console.log(`Hola API REST, corriendo en http://localhost:${port}`);
  });

});
