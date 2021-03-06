const { Router } = require('express')
const { registro, ingresar, sesion } = require('../controllers/Registro')
const { crearSubtarea, eliminarSubtarea, editarSubtarea, obtenerSubtareas } = require('../controllers/Subtareas')
const { crearTarea, eliminarTarea, editarTarea, obtenerTareas } = require('../controllers/Tareas')
const router = Router()

//Usuarios
router.post('/registro', registro)
router.post('/logueo', ingresar)
router.get('/sesion', sesion)


//Tareas
router.post('/crearTarea', crearTarea)
router.delete('/eliminarTarea/:id', eliminarTarea)
router.put('/editarTarea', editarTarea)
router.get('/obtenerTareas/:UsuarioId', obtenerTareas)


//Subtareas
router.post('/crearSubtarea', crearSubtarea)
router.delete('/eliminarSubtarea/:id', eliminarSubtarea)
router.put('/editarSubtarea', editarSubtarea)
router.get('/obtenerSubtareas/:TareaId', obtenerSubtareas)

module.exports = router