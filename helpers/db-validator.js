const Rol = require('../models/rol')
const Usuario = require('../models/user')

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol })
    if(!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const existeEmail = async(correo = '') => {
    const user = await Usuario.findOne({correo})
    if(user) {
        throw new Error(`Ya existe un usuario con el email ${email}`)
    }
}


const existeUsuarioPorId = async( id = '') => {
    const user = await Usuario.findById(id)
    if (!user) {
        throw new Error('Este usuario no se ha registrado en la base de datos')
    }
}


module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}