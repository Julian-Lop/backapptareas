const {Tareas,Subtareas,Estados} = require('../db')

exports.crearTarea = async (req,res) => {
    const {Titulo,Descripcion,FechaIni,FechaFin,IdUsuario} = req.body
    try {
        if(!Titulo || !Descripcion || !IdUsuario) return res.status(204).json({message: 'faltan datos requeridos', creado:false})
        const tarea = await Tareas.create({
            Titulo,
            Descripcion,
            FechaIni,
            FechaFin,
            UsuarioId: IdUsuario,
            EstadoId:1
        })
        if(tarea) return res.status(201).json({message: 'tarea creada exitosamente', creado:true, tarea:tarea})
        else return res.status(200).json({message:'no se pudo crear', creado:false})
    } catch (error) {
        return res.status(500).json({message: error, creado:false})
    }
}


exports.eliminarTarea = async (req,res) => {
    const {id} = req.body
    try {
        const tarea = await Tareas.destroy({where:{id:id}})
        return res.status(410).json({message:'tarea eliminada con exito'})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.editarTarea = async (req,res) => {
    const {Titulo,Descripcion,FechaIni,FechaFin,EstadoId,id} = req.body
    try {
        if(!Titulo || !Descripcion || !id) return res.status(200).json({message:'Hay campos requeridos vacios'})
        const tarea = await Tareas.update(
            {
                Titulo,
                Descripcion,
                FechaIni,
                FechaFin,
                EstadoId
            },{
            where:{
                id:id
            },
        })
        if(tarea[0] > 0) return res.status(201).json({message:'se ha editado la tarea con exíto',tarea:tarea})
        return res.status(400).json({message:'no se pudo editar la tarea'})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

exports.obtenerTareas = async (req,res) => {
    const {UsuarioId} = req.params
    try {
        if(!UsuarioId) return res.status(200).json({message:'debe enviar el id del usuario'})
        
        const tareas = await Tareas.findAll({
            where:{
                UsuarioId:UsuarioId
            },
            attributes : ['id','Titulo','Descripcion','FechaIni','FechaFin','UsuarioId','EstadoId']
            ,
            include: [Estados,Subtareas]
            
        })

        if(tareas.length) return res.status(200).json({tareas:tareas})
        else return res.status(404).json({message:'no se encontró tareas'}) 
    } catch (error) {
        return res.status(500).json({message:error})
    }
}