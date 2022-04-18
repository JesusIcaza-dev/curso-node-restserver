const { Schema, model } = require('mongoose')


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'VENTAS_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
})

// metodos personalizados en base a nuestro esquema
UsuarioSchema.methods.toJson = function() {
    // se desestructura para separa el campo de version y password del resto
    // de campos que si queremos ver en la response
    const {__v, password, ...usuario} = this.toObject()
    return usuario
}

module.exports = model( 'Usuario', UsuarioSchema )