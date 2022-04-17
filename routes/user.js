const { Router } = require('express')
const { usuariosGet , usuariosPost,
        usuariosPut, usuariosDelete} = require('../controller/user')
const router = Router()


router.get('/', usuariosGet)

router.post('/', usuariosPost)

// para indicar que esta ruta va a tener que pasarse un id como parametro en la url
router.put('/:id', usuariosPut)

router.delete('/', usuariosDelete)


module.exports = router