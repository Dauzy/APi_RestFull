'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services');

function signUp(req, res){
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName
  })

  user.save((err) => {
    if (err) res.status(500).send({message: `Error Cant create user ${err}`})

    return res.status(200).send({token: service.createToken(user)})
  })

}

function signIn(req, res){
  user.find({email: req.body.email}, (err,user) => {
    if(err) res.status(500).send({message: `Error: ${err}`})
    if(!user) return res.status(404).send({message: `Could not found user :(`})

    req.user = user
    req.status(200).send({message: 'You are loggin! :)', token: service.createToken(user)})

  })
}

module.exports = {
  signUp,
  signIn
}
