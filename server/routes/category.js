const express = require('express')
const router = express.Router()

//controller
const { list,read,create,update,remove } = require( '../controller/category');

//middleware
const {auth , adminCheck } = require('../middleware/auth')

//Endpoint  http://localhost:8888/api/category
router.get('/category',list)
router.get('/category/:id',auth,adminCheck,read)
router.post('/category',auth,adminCheck,create)
router.put('/category/:id',auth,adminCheck,update)
router.delete('/category/:id',auth,adminCheck,remove)

module.exports = router