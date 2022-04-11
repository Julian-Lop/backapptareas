const { Subtareas } = require('../db')

exports.crearSubtarea = async (req,res) => {
    const { Titulo,Descripcion,TareaId} = req.body
    try {
        if(!Titulo || !Descripcion || !TareaId) return res.status(200).json({message:'hay campos vacios'})

        const subtarea = await Subtareas.create({
            Titulo,
            Descripcion,
            TareaId,
            EstadoId:1
        })
        if(subtarea) return res.status(201).json({message: 'subtarea creada con exíto', subtarea:subtarea})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}


exports.eliminarSubtarea = async (req,res) => {
    const {id} = req.body
    try {
        if(!id) return res.status(200).json({message:'se requiere el id de subtarea'})

        const subtarea = await Subtareas.destroy({where:{id:id}})
        if(subtarea > 0) res.status(201).json({message:'subtarea eliminada con exíto', subtarea:subtarea})
        else return res.status(404).json({message:'no se encontró la subtarea'})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}