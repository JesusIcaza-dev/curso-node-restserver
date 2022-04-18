const {response} = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/user')

const usuariosGet = async ( req, res = response) => {
    // los valores devueltos de la query url son strings importante a tener en cuenta si queremos castear
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true}
    
    // con Promise.all podemos mandar un array de promesas para que se ejecuten simultaneamente
    const [usuarios, total] = await Promise.all([ // importante tener el await aqui ya que si no mandaria antes la response de que esto se resuelva
        Usuario.find(query) // para poner un filtro como si fuera el where en sql
                    .skip(parseInt(desde)) // posicion del registro a empezar a devolver
                    .limit(parseInt(limite)) // limite de registros devueltos
        ,
        Usuario.countDocuments(query) // para contar la cantidad de registros totales devueltos

    ])

    res.json({
        total,
        usuarios
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


const usuariosPut = async ( req, res = response) => {
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
        usuario
    })
}


const usuariosDelete = async ( req, res = response) => {
    const { id } = req.params
    // Forma correcta, eliminacion logica
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false})

    // Forma incorrecta peligrosa, eliminacion fisica
    // const usuario = await Usuario.findByIdAndDelete(id)

    res.json({
        message: 'Usuario eliminado de la base de datos',
        id
    })
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}