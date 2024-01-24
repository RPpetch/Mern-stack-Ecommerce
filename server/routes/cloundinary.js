const express = require('express')
const router = express.Router()

//controller
const{createImage,removeImage} = require('../controller/cloundinary')
//middleware
const {auth , adminCheck } = require('../middleware/auth')

//Endpoint  http://localhost:8888/api/images
router.post('/images',auth,adminCheck,createImage)
router.post('/deleteImages',auth,adminCheck,removeImage)

module.exports = router