const { Router } = require('express')
const { check } = require('express-validator')
const { login } = require('../controller/auth')


const router = Router()

router.post('/login', [
    check('correo', "El correo es obligatorio").isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty()
],login)

module.exports = router