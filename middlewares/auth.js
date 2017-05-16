'use strict'

const services = require('../services/')

function isAuth(req, res, next){
  if(!req.headers.authorization){
    return res.status(403).send({message: 'Fatal Error: You dont have authorization'})
  }

  //Extraemos el token de la cabezera
  const token = req.headers.authorization.split(" ")[1]
  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
}


module.exports = isAuth
