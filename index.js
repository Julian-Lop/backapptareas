const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const { CargarEstados } = require('./src/helpers/CargarEstados')

conn.sync({force:false}).then(async() => {
    await CargarEstados()
    server.listen(process.env.PORT || 3001, () => {
        console.log('Listening at 3001')
    })
})