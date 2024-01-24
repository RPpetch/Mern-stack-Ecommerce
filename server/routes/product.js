const express = require('express')
const router = express.Router()

//controller
const{list,create,remove,read,update,listBy,searchFilters} = require('../controller/product')
//middleware
const {auth , adminCheck } = require('../middleware/auth')

//Endpoint  http://localhost:8888/api/product
router.get('/product/:count',list);
router.post('/product',auth,adminCheck,create);
router.delete('/product/:id',auth,adminCheck,remove)

//update
//Endpoint  http://localhost:8888/api/products
router.get("/products/:id",read)
router.put("/products/:id",auth,adminCheck,update)

//user Page
//Endpoint  http://localhost:8888/api/productBy
router.post("/productby",listBy)

//search
//Endpoint  http://localhost:8888/api/search/filters

router.post("/search/filters",searchFilters)

module.exports = router