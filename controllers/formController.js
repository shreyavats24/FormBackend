
const handleSubmit = (req,res)=>{
    console.log(req.files);
    
    res.json({success:"successfully submitted!!"});
}
module.exports={
    handleSubmit
}