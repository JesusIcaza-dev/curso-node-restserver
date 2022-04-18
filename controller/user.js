const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/user')

const usuariosGet = ( req, res = response) => {
    res.json({
        saludo: 'Api Get Controlador'
    })
}


const usuariosPost = async ( req, res = response) => {
    // recoger los valores que se pasen por el body
    const { nombre, correo, password, rol } = req.body
    // solo recogera los valores que cuadren con el esquema de nuestro modelo
    const usuario = new Usuario( { nombre, correo, password, rol} )
    
    // encriptar la contraseña
    const salt = bcrypt.genSaltSync(10)
    usuario.password = bcrypt.hashSync(password, salt)
    
    // para guardar un registro en la base de datos
    await usuario.save()
    res.json({
        usuario
    })
}


const usuariosPut = ( req, res = response) => {
    // recoger los valores que se pasen por parametros url
    const { id } = req.params
    const { password, google, ...resto } = req.body
    // TODO validar contra base de datos
    if ( password ) {
        // encriptar la contraseña
        const salt = bcrypt.genSaltSync(10)
        resto.password = bcrypt.hashSync( password, salt )
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true})

    res.json({
        saludo: 'Api Put Controlador'
    })
}


const usuariosDelete = ( req, res = response) => {
    res.json({
        saludo: 'Api Delete Controlador'
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}