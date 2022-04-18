const mongoose = require('mongoose')


const dbConnection = async() => {
    try {
        // como el metodo connect nos devuelve una promesa y nuestro metodo es asincrono
        // utilizamos el await para esperar a que resuelva, sino lo capturara el catch
        await mongoose.connect(process.env.MONGODB_ATLAS, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('base de datos online')
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de inicializar la base de datos')
    }
}


module.exports = {
    dbConnection
}