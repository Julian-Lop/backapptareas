const {Tareas} = require('../db')

exports.crearTarea = async (req,res) => {
    const {Titulo,Descripcion,FechaIni,FechaFin,IdUsario} = req.body
    try {
        if(!Titulo || !Descripcion || !IdUsuario) return res.status(204).json({message: 'faltan datos requeridos', creado:false})
        const tarea = await Tareas.create({
            Titulo,
            Descripcion,
            FechaIni,
            FechaFin,
            UsuarioId: IdUsario
        })

        if(tarea) return res.status(201).json({message: 'tarea creada exitosamente', creado:true, tarea:tarea})
    } catch (error) {
        return res.status(500).json({message: error, creado:false})
    }
}