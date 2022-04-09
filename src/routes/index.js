const { Router } = require('express')
const { registro, ingresar, sesion } = require('../controllers/Registro')
const router = Router()

router.post('/registro', registro)
router.post('/logueo', ingresar)
router.get('/sesion', sesion)

module.exports = router