const { Router } = require('express')
const { registro } = require('../controllers/Registro')
const router = Router()

router.post('/registro', registro)

module.exports = router