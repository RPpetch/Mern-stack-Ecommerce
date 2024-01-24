const jwt = require("jsonwebtoken");
// const User = require('../models/Account')

//เช็ค token 
exports.auth = (req,res,next) => {
    try{
        const token = req.headers["authtoken"];

        if(!token){
            return res.status(401).send("no token , authorization denied");
        }
        const decoded = jwt.verify(token,'jwtSecret');
        req.user = decoded.user
        next()

    }catch(err){
        console.log(err);
        res.status(401).send("Token Invavid!!");
    }
}

//เช็ค admin 
exports.adminCheck = async(req,res,next) => {
    try{
        const {username} = req.user
        const adminUser = await User.findOne({username}).exec()
        if(adminUser.role !== "admin"){
            res.status(403).send(err,'Admin access denied')
        }else{
            next()
        }
    }catch (err) {
        console.log(err);
        res.status(401).send("Admin access denied");
      }
}