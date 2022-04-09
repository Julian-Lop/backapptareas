const server = require('./src/app.js')
const { conn } = require('./src/db.js')

conn.sync({force:false}).then(() => {
    server.listen(process.env.PORT || 3001, () => {
        console.log('Listening at 3001')
    })
})