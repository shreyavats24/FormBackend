const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

function verifyUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,SECRET_KEY);
    }
    catch(err)
    {
        console.log(err);
        return null;
    }
}


function createToken(userData){
    const payload={
        email:userData.email,
        // id:userData.id,
    };
    return jwt.sign(payload,SECRET_KEY,{expiresIn:'1h'});
}

module.exports = {
    createToken,
    verifyUser
}