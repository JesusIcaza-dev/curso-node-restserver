const { request, response } = require('express')

const esAdminRol = (req = request, res = response, next) => {
    if(!req.usuario) {
        return res.status(500).json({
            msg:"Se quiere validar el usuario autenticado - error interno"
        })
    }

    const { rol, nombre } = req.usuario
    if ( rol !== 'ADMIN_ROLE' ) {
        return res.status(403).json({
            msg:`${nombre} no es administrador - no tiene permisos para realizar esta operacion`
        })
    }
    next()
}



module.exports = {
    esAdminRol
}