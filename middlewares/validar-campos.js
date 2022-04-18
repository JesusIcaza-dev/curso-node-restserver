const { validationResult } = require("express-validator")

const validarCampos = (req, res, next) => {
    const errors = validationResult(req)
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors)
    }


    // indicamos que si no ha habido ningun error, que prosiga con los siguientes errores
    // en caso de no haber mas, se ejecuta el controlador
    next()
}


module.exports = {
    validarCampos
}