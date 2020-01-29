const express = require('express')
const router = express.Router()

var mailController = require('../controllers/mailController')

// MAILs
router.get('/', mailController.index)
router.post('/send', mailController.send)

module.exports = router;