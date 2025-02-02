const authRouter = require("express").Router(); // module routing level middleware
const authCtrl = require("./auth.controller");
const { bodyValidator } = require("../../middlewares/validator.middleware");
const { RegisterUserDTO } = require("./auth.validator");
const uploader = require("../../middlewares/multipart-handle.middleware");

// uploader().non() =>if content-type is not multipart/form-data but the data doesnot have file upload
// uploader().single(fieldname) => if content-type is multipart/form-data and the data has single file upload
// uploader().array(fieldname, limit) => if content-type is multipart/form-data and the data has multiple file upload
authRouter.post('/register', uploader().single('image'), bodyValidator(RegisterUserDTO), authCtrl.registerUser,)
authRouter.post('/activate', authCtrl.activateUser)


module.exports = authRouter;