const { createToken, verifyUser } = require("./create&getToken");

const usersData = [
    { email:"shreya@gmail.com",password:"12345"},
    { email:"shreyavats@gmail.com",password:"12345"},
    { email:"arush@gmail.com",password:"12345"},
]

const isUserAuthenticated = (req,res,next)=>{
    const result = verifyUser(req.cookies.auth_token);
    if(result)
        next();
    else 
        res.status(400).json({success:false});
}
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    const found = usersData.find((user)=> user.email == email && user.password == password);
    // console.log(found);
    if(found){
        const token = await createToken(found);
        res.cookie("auth_token",token);
        res.status(200).json({success:true});
    }
    else
        res.status(400).json({success:false,message:"please sign up"});
}

module.exports = {
    loginUser,isUserAuthenticated
}