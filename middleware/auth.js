const jwt = require('jsonwebtoken');

const auth = (req,res,next)=>{
    try{
        const token = req.header("auth_header_token");
        if(!token){
            return res.status(401).json({msg: "token not valid"});
        }
        const verifiedToken = jwt.verify(token, process.env.JWT_PW);
        if(!verifiedToken){
            return res.status(401).json({msg: "token verification failed"})
        }

        req.user =verifiedToken.id;
        next();

    }catch(err){
        res.status(500).json({error : err.message});
    }
};

module.exports = auth;