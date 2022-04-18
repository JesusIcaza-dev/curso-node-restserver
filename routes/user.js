const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { usuariosGet , usuariosPost,
        usuariosPut, usuariosDelete} = require('../controller/user')
const { esRolValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWT } = require('../middlewares/validar-jwt')
const { esAdminRol } = require('../middlewares/validar-roles')




router.get('/', usuariosGet)

router.post('/', [
    // es un middleware que valida los parametros del body a validar
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe ser mayor de 6 letras').isLength({ min:6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(existeEmail),
    check('rol').custom( esRolValido ), // no se le pasa el argumento de rol porque implicitamente se la pasa el middleware
    validarCampos

], usuariosPost)

// para indicar que esta ruta va a tener que pasarse un id como parametro en la url
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id', existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
] ,usuariosPut)

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete)


module.exports = router