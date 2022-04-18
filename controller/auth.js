const { response } = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/user')
const {generarJWT} = require('../helpers/generar-jwt')

const login = async (req, res = response) => {
    const { correo, password } = req.body
    try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({correo})
        if(!usuario) {
            return res.status(400),json({
                msg: "Usuario / Passwords no son correctos"
            })
        }

        // Si el usuario está activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg:"Este usuario ya no está activo"
            })
        }

        // verificar la contraseña
        const validPassword = bcrypt.compareSync( password, usuario.password )
        if(!validPassword) {
            return res.status(400).json({
                msg:"Usuario / Passwords no son correctos"
            })
        }

        // Generar JWT
        const token = await generarJWT( usuario.id )
        res.json({
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Algo salido mal"
        })
    }
}



module.exports = {
    login
}