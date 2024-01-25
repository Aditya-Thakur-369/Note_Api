const jwt = require('jsonwebtoken');
const SECRETKEY = "Secretkey";

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRETKEY);
            req.userId = user.id;

        }else{
            res.status(401).json({message: "User not found"});
        }
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({message: "User not found"});
    }
}

module.exports = auth;