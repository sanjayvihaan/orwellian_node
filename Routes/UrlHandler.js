const express = require('express')

const urlcontroller = require('../Controllers/UrlController')
const { requireAuth } = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)
router.post('/url-check', urlcontroller.checkUrl)
router.get('/get-all', urlcontroller.getUrls)

module.exports = router