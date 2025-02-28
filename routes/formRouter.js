const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerFile");
const formControler = require("../controllers/formController")


router.post(
    "/submitForm",
    upload.fields([
        { name: "profileImage", maxCount: 1 },
        { name: "marksheets", maxCount: 5 }
    ]),
    formControler.handleSubmit
);

module.exports= router;