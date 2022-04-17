/**
 * Creacion de nuestro servidor en base a una clase
 * Importamos todos los modulos que sean necesarios
 * y vamos dando forma a nuestra clase
 */

const express = require('express')
const cors = require('cors')

class Server {
    constructor() {
        // inicializar la app express
        this.app = express()
        this.apiPathUser = '/api/usuarios'

        // middlewares
        this.middlewares()

        // inicializar la configuracion de nuestras rutas de la app
        this.routes()
        this.port = process.env.PORT
    }


    middlewares() {
        // Directorio público
        this.app.use(express.static('public'))

        // configuracion cors
        this.app.use(cors())

        // Parseo y lectura del body
        this.app.use(express.json()) // indicamos directamente que el trafico que venga se trate serializar en json
    }


    routes() {
        this.app.use(this.apiPathUser, require('../routes/user'))
    }


    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo el servidor en el puerto', this.port)
        })
    }
}



module.exports = Server // para exportar nuestra clase y poder utilizarlo en otros modulos