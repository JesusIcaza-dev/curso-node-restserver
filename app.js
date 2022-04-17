require('dotenv').config()

// instancia de nuestros servidor desde el modelo
const Server = require('./models/Server')

const server = new Server()
server.listen()