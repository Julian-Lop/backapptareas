const { Estados } = require('../db')

exports.CargarEstados = () => {
    const estados = [{id:1, Nombre:'Proceso'},{id:2, Nombre:'Finalizado'}]
    try {
        estados.forEach(async element => {
            await Estados.findOrCreate({
                where:{
                    id:element.id,
                    Nombre: element.Nombre
                }
            })
        })
    } catch (error) {
        return error
    }
}