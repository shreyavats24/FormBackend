let users = [
    {id:1, name: "Shreya",Age:20,Department:"CA"},
    {id:2,name:"Vaishali",Age:20,Department:"CA"},
    {id:3,name:"Ritika",Age:22,Department:"Mgt"},
    {id:4,name:"Palak",Age:21,Department:"Mgt"}
]

const getUser = (req,res)=>{
    // console.log("/");
    res.json({users});
}

const addUser = (req,res)=>{
    // console.log("add user");
    const data= req.body;
    users.push(data)
    res.json({users,success:"User Added successfully!!"});
}

const deleteUser = (req,res)=>{
    // console.log("delete user");
    const {id} = req.body;
    // console.log(id);
    users= users.filter((user)=>user.id!=id);
    res.json({users,success:"deleted user successfully!!"});
}

const updateUser = (req,res)=>{
    // console.log("update user");
    let {id,name,Age,Department} = req.body;
    // console.log("data",{id,name,Age,Department})
    users = users.map((user)=>{
        if(user.id==id){
            return {id,name,Age,Department}
        }   
        return user;      
    })
    res.json({users,success:"updated users"});
}

module.exports = {
    getUser,updateUser,deleteUser,addUser
}