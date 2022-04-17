require('dotenv').config()

// instancia de nuestros servidor desde el modelo
const Server = require('./models/server')

const server = new Server()
server.listen()