'use strict'
/*  PARA QUE UN APIREST SE REST FULL, NECESITA TENER
    LOS METODOS GET / POST / PUT / DELETE
*/
const app = require('./app')
const mongoose = require('mongoose')
const config = require('./config')


mongoose.connect(config.db, (err, res) => {
  if (err){
    return console.log(`Failed to connect: ${err}`);
  }
  console.log('You are Connect!');

  app.listen(config.port, () => {
    console.log(`Hola API REST, corriendo en http://localhost:${config.port}`);
  });

});
