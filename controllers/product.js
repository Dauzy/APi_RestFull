'use strict'

const Product = require('../models/product')


function getProduct(req,res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Failed to connect: ${err}`})
    if (!product) res.status(404).send({message: `Product not exists`})
    res.status(200).send({product: product})
  })
}

function getProducts(req, res){
  Product.find({}, (err, products) => {
    if(err) res.status(500).send({message: `Failed to connect: ${err}`})
    if(!products) return res.status(404).send({message: 'Products not exists'})

    res.send(200, {products})
  })
}

function saveProduct(req,res){
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
}

function updateProduct(req, res){
  let productId = req.params.productId
  let update_body = req.body

  Product.findByIdAndUpdate(productId, update_body, (err, productUpdated) => {
    if (err) res.status(500).send({message: `Failed to connect: ${err}`})
    if (!productUpdated) res.status(404).send({message: `Product not exists`})

    res.status(200).send({product: productUpdated})
  });
}

function deleteProduct(req, res){
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if (err) res.status(500).send({message: `Failed to connect: ${err}`})
    if (!product) res.status(404).send({message: `Product not exists`})

    product.remove(err =>{
      if (err) res.status(500).send({message: `Failed to connect: ${err}`})
      res.status(200).send({message: 'Se elimino con exito!'})
    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
