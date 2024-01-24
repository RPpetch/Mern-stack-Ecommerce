const express = require('express')
const router = express.Router()
const {
    tester, register,login,
    
} = require('../controller/auth')
const User = require('../models/Account')


const { auth, adminCheck } = require("../middleware/auth");
const { currentUser } = require('../controller/user');

//Register
//EndPoint http://localhost:8888/auth/register
//Method POST
router.post("/register", register);

//login
//EndPoint http://localhost:8888/auth/login
//Method POST
router.post("/login",login);

//Endpoint  http://localhost:8000/api/current-user
//@Method    POST
router.post("/current-user",auth,currentUser);

//@Endpoint  http://localhost:8000/api/current-admin
//@Method    POST
//@Access    Private
router.post("/current-admin",auth,adminCheck,currentUser);


module.exports = router;
