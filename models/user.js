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


// Redifinicion del metodo toJson del esquema para no mostrar ni el id, ni la password ni el campo molesto de __v
UsuarioSchema.methods.toJSON = function () {
    const { _id, password, __v, ...resto } = this.toObject()
    return resto
}



module.exports = model( 'Usuario', UsuarioSchema )