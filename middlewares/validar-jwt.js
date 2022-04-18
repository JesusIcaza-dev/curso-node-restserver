const jwt = require('jsonwebtoken')
const {request, response} = require('express')
const Usuario = require('../models/user')

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if (!token) {
        return res.status(401).json({
            msg:"No hay token en la peticion"
        })
    }

    try {
        // nos devuelve el payload decodificado | const payload, pero hacemos desestructuracion
        const { uid } = jwt.verify( token, process.env.SECRET_KEY)

        // Leer el usuariob que corresponde al uid que nos ha devuelto
        const usuario = await Usuario.findById(uid)

        // comprobar si existe el usuario
        if(!usuario) {
            return res.status(401).json({
                msg:"Token no valido - este usuario no existe en la base de datos"
            })
        }

        // comprobar si el usuario que se ha autenticado sigue activo para poder ejercer la accion deseada
        if(!usuario.estado) {
            return res.status(401).json({
                msg:"El token no es valido - usuario con estado false"
            })
        }
        
        // mandarle a la request el usuario autenticado
        req.usuario = usuario
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg:"Token no valido"
        })
    }
}


module.exports = {
    validarJWT
}