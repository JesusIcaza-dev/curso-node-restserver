const Rol = require('../models/rol')
const Usuario = require('../models/user')

const esRolValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol })
    if(!existeRol) {
        throw new Error(`El rol ${rol} no está registrado en la base de datos`)
    }
}

const existeEmail = async(email = '') => {
    const user = await Usuario.findOne({email})
    if(user) {
        throw new Error(`Ya existe un usuario con el email ${email}`)
    }
}


module.exports = {
    esRolValido,
    existeEmail
}