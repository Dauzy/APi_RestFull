var url = 'localhost/apirest'

module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://'+url,
  SECRET_TOKEN: 'miclavedetokens'
}
