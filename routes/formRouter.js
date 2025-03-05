const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerFile");
const formControler = require("../controllers/formController");
const SampleController = require("../controllers/SampleController");
const authController = require("../controllers/AuthController");
router.get(
  "/getUser",
  authController.isUserAuthenticated,
  SampleController.getUser
);
router.post(
  "/submitForm",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "marksheets", maxCount: 5 },
  ]),
  formControler.handleSubmit
);
router.post("/login", authController.loginUser);
router.post(
  "/addUser",
  authController.isUserAuthenticated,
  SampleController.addUser
);
router.put(
  "/updateUser",
  authController.isUserAuthenticated,
  SampleController.updateUser
);
router.post(
  "/deleteUser",
  authController.isUserAuthenticated,
  SampleController.deleteUser
);
module.exports = router;