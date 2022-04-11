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


exports.editarSubtarea = async (req,res)=>{
    const { id,Titulo,Descripcion,EstadoId} = req.body
    try {
        if(!Titulo || !Descripcion || !id) return res.status(200).json({message:'hay campos vacios'})

        const subtarea = await Subtareas.update(
            {
                Titulo,
                Descripcion,
                EstadoId
            },{
            where:{
                id:id
            }
        })

        if(subtarea[0] > 0) return res.status(201).json({message:'Subtarea editada con exíto', subtarea:subtarea})
        else return res.status(404).json({message:'No se econtró la subtarea'})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}


exports.obtenerSubtareas = async (req,res) => {
    const { TareaId } = req.params
    try {
        if(!TareaId) return res.status(200).json({message:'hay campos vacios'})
        
        const subtareas = await Subtareas.findAll({
            where:{
                TareaId:TareaId
            },
            attributes: ['id','Titulo','Descripcion','TareaId','EstadoId']
        })

        if(subtareas.length) return res.status(200).json({message:'subtareas obtenidas con exíto', subtareas:subtareas})
        else return res.status(404).json({message:'subtareas no encontradas'})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}