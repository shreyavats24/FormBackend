const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, './public/images')
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname); // Rename the file
    }
})
const upload = multer({
    storage: storage,  
    limits: { fileSize: process.env.SIZE * 1024 * 1024}, 
});


module.exports = upload 