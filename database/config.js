const mongoose = require('mongoose')

const dbConnection = async () =>  {

    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
//            useCreateIndex: true,
//            useFindAndModify: false
        })

        console.log('Conexión creada con éxito.')

    } catch (error) {
        console.error(error)
        throw new Error('Error al realizar conexión con base de datos.')
    }

}

module.exports = {
    dbConnection
}