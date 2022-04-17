const {response} = require('express')

const usuariosGet = ( req, res = response) => {
    res.json({
        saludo: 'Api Get Controlador'
    })
}


const usuariosPost = ( req, res = response) => {
    // recoger los valores que se pasen por el body
    const body = req.body
    res.json({
        body
    })
}


const usuariosPut = ( req, res = response) => {
    // recoger los valores que se pasen por parametros url
    const params = req.params
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