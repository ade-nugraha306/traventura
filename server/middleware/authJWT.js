const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message: 'Token tidak ditemukan'
        })
    }
    
    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) =>{
        if(err){
            return res.status(403).json({
                message: 'Token tidak valid'
            })
        }
        req.userId = decoded.id;
        next();
    })
}

module.exports = authJWT;